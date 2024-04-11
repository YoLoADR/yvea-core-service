import { Category } from '../../modules/partners/entities';
import { CategoriesService } from '../../modules/partners/services/categories/categories.service';
import { MarketplaceCategory } from '../constants/marketplaceCategory.constants';

export const createPartnersCategories = async (
  categoriesService: CategoriesService,
): Promise<void> => {
  const categories = Object.values(MarketplaceCategory).map((c) => {
    const category = new Category();
    category.id = c;
    category.name = c;
    return category;
  });

  console.log('Creating Categories if not exists...');

  const res = await categoriesService.upsertMany(categories);

  const createdIds = res.identifiers.filter((id) => !!id);

  if (createdIds.length > 0) {
    console.log('Created Categories with ids: ', createdIds);
  } else {
    console.log('No new Categories to add');
  }

  console.log('Finished!');
};
