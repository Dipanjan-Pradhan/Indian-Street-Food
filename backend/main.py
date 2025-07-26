from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from database import vendor_collection,supplier_collection
import utils as ut
app = FastAPI()
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]


app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class VendorData(BaseModel):
    name:str
    phone_number: int
    longitude: float
    latitude: float

class SupplierData(BaseModel):
    name:str
    phone_number:int
    email: str
    longitude: float
    latitude:float

@app.post("/add_vendor")
def add_vendor(vendor_data:VendorData):
    vendor_collection.insert_one(vendor_data.dict())
    return vendor_data

@app.post("/add_supplier")
def add_supplier(supplierData:SupplierData):
    supplier_collection.insert_one(supplierData.dict())
    return supplierData


@app.get("/getnearbysupplier")
def get_supplier(long:float,lat:float,dst:float):
    supplier_list = {}
    for supplier in supplier_collection.find():
        distance = ut.calculate_distance(long,lat,supplier['longitude'],supplier["latitude"])
        if distance <= dst:
            
            supplier_list[str(supplier['_id'])] = {
                'id' : str(supplier["_id"]),
                'Name': supplier['name'],
                'email': supplier['email'],
                'phone_number':supplier['phone_number']
            }
            
    
    return supplier_list