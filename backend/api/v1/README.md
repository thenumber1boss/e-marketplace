# API V1

* [Products](#products)
* [Vendors](#vendors)


## Products
API Routes for Products:

**Get product categories**
GET /api/v1/products/categories
```
curl -i http://127.0.0.1:5000/api/v1/products/categories
```
**Response**
```
HTTP/1.1 200 OK
Server: Werkzeug/3.0.1 Python/3.9.18
Date: Sat, 16 Dec 2023 01:36:13 GMT
Content-Type: application/json
Content-Length: 84
Access-Control-Allow-Origin: *
Connection: close

[
  "Grains",
  "Roots/Tubers",
  "Fruits/Vegetables",
  "Meat/Poultry",
  "Oils"
]
```

**Top selling products**
GET /api/v1/products/top-selling
```
curl -i http://127.0.0.1:5000/api/v1/products/top-selling
```
**Response**
```
HTTP/1.1 200 OK
Server: Werkzeug/3.0.1 Python/3.9.18
Date: Sat, 16 Dec 2023 01:41:29 GMT
Content-Type: application/json
Content-Length: 4078
Access-Control-Allow-Origin: *
Connection: close

{
  "244d548a-caf7-43a4-9412-802d99bd1f5f": {
    "_Product__price": 8381,
    "_Product__rating": 0,
    "_Product__stock": 882,
    "category": "Meat/Poultry",
    "created_at": "2023-12-16T00:38:25.805169",
    "id": "244d548a-caf7-43a4-9412-802d99bd1f5f",
    "name": "Beef",
    "num_ratings": 0,
    "object": "Product",
    "unit": "kg",
    "vendor_id": "8f4c6d2b-817c-479d-9c04-de5f3b96db34"
  },
  ...,
  "ee7835b6-645d-410b-99ba-d4a40a2873d7": {
    "_Product__price": 1614,
    "_Product__rating": 0,
    "_Product__stock": 748,
    "category": "Roots/Tubers",
    "created_at": "2023-12-16T00:38:25.803841",
    "id": "ee7835b6-645d-410b-99ba-d4a40a2873d7",
    "name": "Beetroot",
    "num_ratings": 0,
    "object": "Product",
    "unit": "unit",
    "vendor_id": "f63140de-e677-4c6f-9888-51ff7c6ebc32"
  }
}
```

**Retrieve Products**
GET /api/v1/products
```
curl -i http://127.0.0.1:5000/api/v1/products/
```
**Response**
```
HTTP/1.1 200 OK
Server: Werkzeug/3.0.1 Python/3.9.18
Date: Sat, 16 Dec 2023 01:44:29 GMT
Content-Type: application/json
Content-Length: ...
Access-Control-Allow-Origin: *
Connection: close
...
"c99c4d59-415e-42ca-a20d-43664611dc45": {
    "_Product__price": 12818,
    "_Product__rating": 0,
    "_Product__stock": 604,
    "category": "Meat/Poultry",
    "created_at": "2023-12-16T00:38:25.820584",
    "id": "c99c4d59-415e-42ca-a20d-43664611dc45",
    "name": "Vension",
    "num_ratings": 0,
    "object": "Product",
    "unit": "kg",
    "vendor_id": "a6c0a3c8-ff1f-4c64-b55c-3fa2b21a64d0"
  }...
 
```

**Retrieve Products**
GET /api/v1/products/<category>
Where category is the product's category so:
*category_routes = {*
            *'fruits-veggies': 'Fruits/Vegetables',*
            *'grains': 'Grains',*
            *'oils': 'Oils',*
            *'meat-poultry': 'Meat/Poultry',*
            *'roots-tubers': 'Roots/Tubers'*
        }
```
curl -i http://127.0.0.1:5000/api/v1/products/grains
```
**Response**
```
HTTP/1.1 200 OK
Server: Werkzeug/3.0.1 Python/3.9.18
Date: Sat, 16 Dec 2023 01:50:29 GMT
Content-Type: application/json
Content-Length: ...
Access-Control-Allow-Origin: *
Connection: close
  {
    "118b8804-e416-434a-b5fa-7bfbe96fd380": {
      "_Product__price": 9987,
      "_Product__rating": 0,
      "_Product__stock": 350,
      "category": "Grains",
      "created_at": "2023-12-16T00:38:25.873561",
      "id": "118b8804-e416-434a-b5fa-7bfbe96fd380",
      "name": "Wheat",
      "num_ratings": 0,
      "object": "Product",
      "unit": "kg",
      "vendor_id": "a6eb4c02-aae8-4966-9dc7-e23d7ffaf9ac"
    }
  },
  {
    "a5739f73-75a4-4f74-a3fa-4939e3ba00ee": {
      "_Product__price": 8438,
      "_Product__rating": 0,
      "_Product__stock": 534,
      "category": "Grains",
      "created_at": "2023-12-16T00:38:25.873862",
      "id": "a5739f73-75a4-4f74-a3fa-4939e3ba00ee",
      "name": "Corn",
      "num_ratings": 0,
      "object": "Product",
      "unit": "litre",
      "vendor_id": "f63140de-e677-4c6f-9888-51ff7c6ebc32"
    }
  }
  ```

## Vendors
API Routes for Vendors

**Retrieve Top Wonders**
GET /api/v1/vendors/top-vendors
```
 curl -i http://127.0.0.1:5000/api/v1/vendors/top-vendors
```
**Response**
```
HTTP/1.1 200 OK
Server: Werkzeug/3.0.1 Python/3.9.18
Date: Sat, 16 Dec 2023 01:55:04 GMT
Content-Type: application/json
Content-Length: 4088
Access-Control-Allow-Origin: *
Connection: close

{
  "1dc52116-2b4c-4782-bbe9-fac26d65dc48": {
    "created_at": "2023-12-16T00:38:19.123042",
    "email": "ahmad.h@coldmail.com",
    "farmname": "Amida Farm",
    "firstname": "Hamida",
    "id": "1dc52116-2b4c-4782-bbe9-fac26d65dc48",
    "lastname": "Ahmad",
    "location": "Otukpo",
    "num_ratings": 0,
    "object": "Vendor",
    "phone": "444-555",
    "rating": 0,
    "username": "amida"
  }...
}

```
