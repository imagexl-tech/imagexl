import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    secret_key: str = "dev-secret-key-change-me"
    admin_username: str = "admin"
    admin_password: str = "admin123"
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 12

    class Config:
        env_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
