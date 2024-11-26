from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
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

# Receber dados do FORM e usar no dataset.
@app.post("/")
def save_health_data(data: HealthData):
    print(data)
    health_entry = data.dict()
    database.append(health_entry)
    
    # Carregar objetos salvos
    model = joblib.load('random_forest_model.pkl')
    ordinal = joblib.load('ordinal_encoder.pkl')
    scaler_idade = joblib.load('scaler_idade.pkl')

    # Criar um DataFrame com os novos dados
    new_data = pd.DataFrame([database], columns=X.columns)

    # Aplicar as mesmas transformações do treinamento
    new_data['age'] = scaler_idade.transform(new_data[['age']])
    categorical_columns = ['sex', 'cp', 'fbs', 'restecg', 'exang']
    new_data[categorical_columns] = ordinal.transform(new_data[categorical_columns])

    # Fazer a previsão
    prediction = model.predict(new_data)
    print("Predição:", prediction)
    return {"message": "Dados salvos com sucesso!", "data": prediction}

@app.get("/")
def get_health_data():
    return {"database": database}
