from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()


class Message(BaseModel):
    text: str


messages = []  # 여기에 채팅 메세지를 리스트로 저장


@app.post("/send-message/")
async def send_message(message: Message):
    messages.append(message.text)
    return {"message": "메세지가 성공적으로 전송되었습니다."}


@app.get("/get-messages/")
async def get_messages():
    return {"messages": messages}

app.mount("/", StaticFiles(directory="static", html=True), name="static")
