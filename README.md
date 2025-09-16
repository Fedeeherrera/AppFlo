# ✈️ Aeroclub Manager

## 📌 Introducción  
**Aeroclub Manager** es una aplicación web que permite gestionar de forma sencilla y eficiente la **carga de combustible** y el **registro de vuelos** de un aeroclub.  
Está pensada para pilotos y administradores, brindando control en tiempo real de las operaciones diarias.

## 📑 Tabla de Contenido  
- [Características principales](#-características-principales)  
- [Instalación y configuración](#-instalación-y-configuración)  
- [Cómo usarlo](#-cómo-usarlo)  
- [Ejemplos](#-ejemplos)  
- [Desafíos y tecnologías](#-desafíos-y-tecnologías)  

## ⚡ Características principales  
- Registro de vuelos con: fecha, avión, piloto, horas voladas y observaciones.  
- Registro de cargas de combustible con: fecha, piloto y litros cargados.  
- Sistema de autenticación con **roles** (usuarios y administradores).  
- Historial de vuelos y cargas accesible desde el panel.  
- Vista personalizada según el rol del usuario.  

## 🛠️ Instalación y configuración  
Clona el repositorio e instala las dependencias:  

```bash
git clone https://github.com/tuusuario/aeroclub-manager.git
cd aeroclub-manager
npm install
```

Ejecuta el proyecto en modo desarrollo:  

```bash
npm run dev
```

Compila el proyecto para producción:  

```bash
npm run build
```

Levanta la aplicación compilada:  

```bash
npm start
```

> ⚠️ Antes de ejecutar la aplicación, crea un archivo `.env.local` en la raíz con las credenciales de Firebase o Supabase.  

## 🚀 Cómo usarlo  
1. Inicia sesión con tu usuario o regístrate.  
2. Elige el módulo que quieras usar:  
   - **Vuelos:** registra fecha, avión, piloto, horas voladas y observaciones.  
   - **Combustible:** carga fecha, piloto y litros de combustible.  
3. Consulta el historial:  
   - Los **usuarios** ven solo su propio historial.  
   - Los **administradores** acceden a todos los registros.  

## 🎬 Ejemplos  

### Registro de vuelo  
```json
{

  "piloto": "Federico Herrera",
  "tipoVuelo": "Instruccion",
  "horaDespegue": 14:30,
  "horaAterrizaje": 16:00,
  "cantidadAterrizajes": 2,
  "comienzoVuelo" : "FLO",
  "finalizarVuelo" : "FLO",
  "fecha": "2025-09-15",
  "avion": "Cessna 150",
  "fechaDeCreacion": 2025-09-16
}
```

### Registro de carga de combustible  
```json
{
  "fecha": "2025-09-15",
  "piloto": "Federico Herrera",
  "litros": 120
}
```

## 🧑‍💻 Desafíos y tecnologías  

**Tecnologías utilizadas:**  
- **Frontend:** React
- **Base de datos y auth:** upabase  
- **Estilos:** TailwindCSS, Formik y Yup  

### Desafíos encontrados:  
- Sincronización en tiempo real de registros.  
- Validaciones robustas en formularios.  

### Futuras implementaciones:  
- Exportar reportes en PDF/Excel.  
- Notificaciones automáticas de vuelos y cargas.  
- Dashboard con estadísticas gráficas.  
- Implementar un sistema de roles con distintos permisos.  
