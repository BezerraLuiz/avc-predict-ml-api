## pip install fastapi uvicorn pandas scikit-learn joblib pydantic

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de entrada
class HealthData(BaseModel):
    idade: int
    possui_hipertensao: str
    possui_doenca_cardiaca: str
    nivel_glicose: float
    imc: float
    fumo: str
    teve_avc: str

# Banco de dados em memória
database = []

@app.post("/")
def save_health_data(data: HealthData):
    try:
        # Transformar os dados para o modelo
        health_entry = {
            "age": data.idade,
            "hypertension": 1 if data.possui_hipertensao.lower() == "sim" else 0,
            "heart_disease": 1 if data.possui_doenca_cardiaca.lower() == "sim" else 0,
            "avg_glucose_level": data.nivel_glicose,
            "bmi": data.imc,
            "smoking_status": data.fumo.lower(),
            "stroke": 1 if data.teve_avc.lower() == "sim" else 0,
        }
        database.append(health_entry)

        # Carregar modelos
        model = joblib.load("random_forest_model.pkl")
        ordinal = joblib.load("ordinal_encoder.pkl")
        scaler_idade = joblib.load("scaler_idade.pkl")

        # Criar DataFrame
        new_data = pd.DataFrame([health_entry])
        new_data["age"] = scaler_idade.transform(new_data[["age"]])
        categorical_columns = ["hypertension", "heart_disease", "smoking_status"]
        new_data[categorical_columns] = ordinal.transform(new_data[categorical_columns])

        # Fazer a previsão
        prediction = model.predict(new_data)
        return {"message": "Dados salvos com sucesso!", "prediction": prediction.tolist()}

    except Exception as e:
        return {"error": str(e)}, 500

@app.get("/")
def get_health_data():
    return {"database": database}
