import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { JWTPayload } from '@libs/interfaces';
import {
  CertificateDocument,
  CertificateProductDocument,
} from '@modules/certificates/entities';
import { UsersService } from '@modules/users/services';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
  private client: S3Client;
  private params: { Bucket: string };

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.client = new S3Client();
    this.params = {
      Bucket: this.configService.getOrThrow('S3_BUCKET_NAME'),
    };
  }

  async userHasAuthorization({ sub: userId }: JWTPayload, key: string) {
    if (await this.usersService.isAdmin(userId)) {
      return true;
    }

    const [certificate, product] = await Promise.all([
      CertificateDocument.countBy({ key, certificate: { userId } }),
      CertificateProductDocument.countBy({
        key,
        product: { code: { certificate: { userId } } },
      }),
    ]);

    return !!(certificate + product);
  }

  async putObject(base64: string) {
    const command = new PutObjectCommand({
      ...this.params,
      Key: randomUUID(),
      Body: Buffer.from(base64, 'base64'),
    });

    this.client.send(command);

    return command.input.Key;
  }

  async getSignedUrl(Key: string) {
    const command = new GetObjectCommand({ ...this.params, Key });
    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }
}
