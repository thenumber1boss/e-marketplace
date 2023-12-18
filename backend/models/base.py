#!/usr/bin/env python3.9
""" Define the base model for other models, including users, vendors, and products """
from datetime import datetime
from uuid import uuid4
from backend.database import file_store


time = "%Y-%m-%dT%H:%M:%S.%f"

class BaseModel:
    """ BaseModel class, template for creating all objects
    Attributes:
        id (str): a uuid4 unique id auto generated whenever a new object is created
        created_at: (datetime.datetime): timestamp of object creation
    
    Methods:
        save(): save the object
        delete(): delete the object
    """

    def __init__(self):
        """ Initialization function to create id and timestamp """
        self.id = str(uuid4())
        self.created_at = datetime.utcnow()
    
    def __str__(self):
        return (f"{self.__class__}: {self.id}-{self.created_at}")
    
    def to_dict(self):
        the_dict = self.__dict__
        if 'created_at' in the_dict and not isinstance(the_dict['created_at'], str):
            the_dict['created_at'] = the_dict['created_at'].strftime(time)
        the_dict['object'] = self.__class__.__name__
        return self.__dict__
    
    def save(self):
        """ initially save a newly initialized object for the first time """
        pass
    
    def update(self):
        """ update an object when changes have been made """
        key = self.id
        print("\n\nUpdating...", key)
        # print(file_store.all_products[self.id])
        if self.__class__.__name__ == 'Product':
            file_store.all_products[key] = self.to_dict()
        elif self.__class__.__name__ == 'Vendor':
            file_store.all_vendors[key] = self.to_dict()
