from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthData(BaseModel):
    idade: int
    possui_hipertensao: str
    possui_doenca_cardiaca: str
    nivel_glicose: int
    imc: int
    fumo: str
    genero: str
    tipo_trabalho: str
    tipo_residencia: str
    estado_civil: str

database = []

@app.on_event("startup")
def load_models():
    global model, ordinal, scaler_idade
    model = joblib.load("random_forest_model.pkl")
    ordinal = joblib.load("ordinal_encoder.pkl")
    scaler_idade = joblib.load("scaler_idade.pkl")

@app.post("/")
def save_health_data(data: HealthData):
    health_entry = {
        "gender": 1 if data.genero == 'Male' else 0,
        "age": data.idade,
        "hypertension": 1 if data.possui_hipertensao == 'Yes' else 0,
        "heart_disease": 1 if data.possui_doenca_cardiaca == 'Yes' else 0,
        "ever_married": 1 if data.estado_civil == 'Yes' else 0,
        "work_type": 2 if data.tipo_trabalho == 'Private' else 3,
        "Residence_type": 1 if data.tipo_residencia == 'Urban' else 0,
        "smoking_status": 1 if data.fumo == 'formerly smoked' else (2 if data.fumo == 'never smoked' else 3),
        "bmi_cat": data.imc,
        "avg_glucose_level_cat": data.nivel_glicose
    }

    database.append(health_entry)

    new_data = pd.DataFrame([health_entry])

    categorical_columns = ["gender", "ever_married", "work_type", "Residence_type", "smoking_status"]
    
    missing_columns = [col for col in categorical_columns if col not in new_data.columns]
    if missing_columns:
        return {"error": f"Faltando as colunas: {', '.join(missing_columns)}"}
    
    new_data[categorical_columns] = ordinal.transform(new_data[categorical_columns])

    new_data["age"] = scaler_idade.transform(new_data[["age"]])

    prediction = model.predict(new_data)

    return {"message": "Dados salvos com sucesso!", "prediction": prediction[0]}

@app.get("/")
def get_health_data():
    return {"database": database}