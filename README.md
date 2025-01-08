# PowerTrack

## Backend
Instal·lar dependències amb 'requirements.txt'

```
# Crear entorn virtual (no penjar al repo)
python3 -m venv venv

# Activar entorn virtual
source venv/bin/activate

# Instal·lar dependències
pip install -r requirements.txt

# Fer migracions
python manage.py makemigrations
python manage.py migrate

# Correr backend
python manage.py runserver
```

Afegir llibreria a `requirements.txt`
```
pip install llibreria

pip list | grep llibreria
# llibreria x.0.0

# Apuntar al fitxer llibreria==x.0.0
```

## Frontend
```
npm install
npm start
```

## Autors

Aina Gomez

Nora Caballero

Jiahao Liu

Sara Díaz
