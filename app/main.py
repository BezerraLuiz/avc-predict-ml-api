from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthData(BaseModel):
    idade: int
    possui_hipertensao: str
    possui_doenca_cardiaca: str
    nivel_glicose: float
    imc: float
    fumo: str
    teve_avc: str

database = []

@app.post("/")
def save_health_data(data: HealthData):
    print(data)
    health_entry = data.dict()
    database.append(health_entry)
    return {"message": "Dados salvos com sucesso!", "data": health_entry}

@app.get("/")
def get_health_data():
    return {"database": database}
