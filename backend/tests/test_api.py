from fastapi.testclient import TestClient

from app.main import app, settings


def test_health_endpoint():
    settings.mongodb_uri = None
    with TestClient(app) as client:
        response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_invalid_github_username():
    settings.mongodb_uri = None
    with TestClient(app) as client:
        response = client.get("/api/github/not valid")

    assert response.status_code == 422
