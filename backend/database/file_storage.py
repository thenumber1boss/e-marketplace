""" implement initial storage """
import json
# from backend.models.product import products_list




class FileStorage:
    """ Rudimentary file storage """
    __file_path  ='./backend/database/store.json'
    __objects = {}
    all_products = {}
    all_vendors = {}

    def save(self):
        # first reload the saved objects
        stored_objects = self.all()
        if stored_objects:
            stored_products = stored_objects['products']
            stored_vendors = stored_objects['vendors']
        else:
            stored_products = {}
            stored_vendors = {}
        # get new products
        stored_products.update({key: val for key,val in self.all_products.items()})
        stored_vendors.update({key: val for key,val in self.all_vendors.items()})

        objs = {
            'products': stored_products,
            'vendors': stored_vendors
        }

        # add the new
        with open(self.__file_path, "w", encoding="utf-8") as f:
            json.dump(objs, f)
    
    def all(self):
        """ retrieve all objects """
        try:
            with open(self.__file_path, 'r', encoding="utf-8") as f:
                self.__objects = json.load(f)
                return self.__objects
        except:
            return {}
    
    def get_products(self, cat: str=None) -> list:
        """ retrieve products
        Args:
            cat(str) = None: the category of products to retrieve.
                If None, retrieve all products
        Return:
            products(list)
        """
        # map routes to corresponding categories
        cat_routes = {
            'fruits-veggies': 'Fruits/Vegetables',
            'grains': 'Grains',
            'oils': 'Oils',
            'meat-poultry': 'Meat/Poultry',
            'roots-tubers': 'Roots/Tubers'
        }
        products = self.all()['products']
        if cat is None:
            return products
        cat = cat_routes[cat]
        return [{k:v} for k,v in products.items() if v['category'] == cat]
    
    def get_vendors(self) -> list:
        """ retrieve vendors """
        return self.all()['vendors']

    def clear_storage(self):
        """ clear all saved objects from the storage """
        with open(self.__file_path, 'w') as f:
            f.truncate()
