# from fastapi import FastAPI
# from pydantic import BaseModel

# # Criação da aplicação FastAPI
# app = FastAPI()

# # Modelo de dados que a API receberá
# class HealthData(BaseModel):
#     idade: int
#     possui_hipertensao: bool
#     possui_doenca_cardiaca: bool
#     nivel_glicose: float
#     imc: float
#     altura: float
#     peso: float
#     fuma: bool
#     teve_avc: bool

# # Variável para armazenar os dados
# database = []

# # Rota para receber e salvar os dados
# @app.post("/api/health-data")
# def save_health_data(data: HealthData):
#     # Converte os dados recebidos em dicionário e salva no "database"
#     health_entry = data.dict()
#     database.append(health_entry)
#     return {"message": "Dados salvos com sucesso!", "data": health_entry}

# # Rota para retornar todos os dados salvos
# @app.get("/api/health-data")
# def get_health_data():
#     return {"database": database}
