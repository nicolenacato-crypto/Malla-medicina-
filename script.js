let materias = []; // aquí se guardan todas las materias dinámicamente
const contenedor = document.getElementById("contenedor");

/* ===== Crear materia ===== */
function crearMateria(m) {
  const mat = document.createElement("div");
  mat.className = "materia-columna bloqueada";
  mat.dataset.id = m.codigo;
  mat.dataset.semestre = m.semestre;
  mat.dataset.requisitos = m.requisitos || "";

  mat.innerHTML = `
    <h3>${m.nombre}</h3>
    <p>Créditos: ${m.creditos}</p>
    <p>Prerrequisitos: ${m.requisitos || "Ninguno"}</p>
    <div class="progresos">
      <input class="p1" type="number" min="0" max="10" placeholder="P1">
      <input class="p2" type="number" min="0" max="10" placeholder="P2">
      <input class="p3" type="number" min="0" max="10" placeholder="P3">
    </div>
    <p class="nota-final">Nota final: <span>0.00</span></p>
  `;

  // eventos para calcular nota
  const inputs = mat.querySelectorAll("input");
  inputs.forEach(i => {
    i.addEventListener("input", () => calcularNota(mat));
  });

  contenedor.appendChild(mat);
  materias.push(m);
  actualizarBloqueos();
}

/* ===== Calcular nota ===== */
function calcularNota(mat) {
  const p1 = parseFloat(mat.querySelector(".p1").value) || 0;
  const p2 = parseFloat(mat.querySelector(".p2").value) || 0;
  const p3 = parseFloat(mat.querySelector(".p3").value) || 0;
  const final = (p1*0.25 + p2*0.35 + p3*0.4).toFixed(2);
  mat.querySelector(".nota-final span").textContent = final;

  if(final >= 7){
    mat.classList.add("aprobada");
    mat.classList.remove("reprobada");
  } else {
    mat.classList.add("reprobada");
    mat.classList.remove("aprobada");
  }

  actualizarBloqueos();
  guardarDatos();
  actualizarProgresoTotal();
}

/* ===== Bloqueo por prerrequisitos ===== */
function actualizarBloqueos() {
  document.querySelectorAll(".materia-columna").forEach(mat => {
    const reqs = mat.dataset.requisitos;
    if(!reqs) {
      mat.classList.remove("bloqueada");
      return;
    }
    const aprobadas = reqs.split(",").every(id=>{
      const r = document.querySelector(`[data-id="${id.trim()}"]`);
      return r && r.classList.contains("aprobada");
    });
    mat.classList.toggle("bloqueada", !aprobadas);
  });
}

/* ===== Progreso total ===== */
function actualizarProgresoTotal() {
  const todas = document.querySelectorAll(".materia-columna").length;
  const aprobadas = document.querySelectorAll(".materia-columna.aprobada").length;
  document.getElementById("progresoTotal").textContent = todas ? Math.round(aprobadas/todas*100)+"%" : "0%";
}

/* ===== Guardar y cargar ===== */
function guardarDatos() {
  const datos = {};
  document.querySelectorAll(".materia-columna").forEach(m=>{
    datos[m.dataset.id] = {
      p1: m.querySelector(".p1").value,
      p2: m.querySelector(".p2").value,
      p3: m.querySelector(".p3").value
    };
  });
  localStorage.setItem("mallaNotas", JSON.stringify(datos));
}

function cargarDatos() {
  const datos = JSON.parse(localStorage.getItem("mallaNotas")) || {};
  document.querySelectorAll(".materia-columna").forEach(m=>{
    if(!datos[m.dataset.id]) return;
    m.querySelector(".p1").value = datos[m.dataset.id].p1;
    m.querySelector(".p2").value = datos[m.dataset.id].p2;
    m.querySelector(".p3").value = datos[m.dataset.id].p3;
    calcularNota(m);
  });
}

/* ===== Mostrar semestres ===== */
function mostrarSolo(n){
  document.querySelectorAll(".materia-columna").forEach(m=>{
    m.style.display = m.dataset.semestre==n ? "block" : "none";
  });
}

function mostrarTodo(){
  document.querySelectorAll(".materia-columna").forEach(m=>{
    m.style.display = "block";
  });
}

/* ===== Agregar materia desde formulario ===== */
function agregarMateria(){
  const nombre = document.getElementById("nombreMateria").value;
  const codigo = document.getElementById("codigoMateria").value;
  const creditos = parseInt(document.getElementById("creditosMateria").value);
  const semestre = parseInt(document.getElementById("semestreMateria").value);
  const requisitos = document.getElementById("requisitosMateria").value;

  if(!nombre || !codigo || !creditos || !semestre) return alert("Llena todos los campos");

  crearMateria({nombre,codigo,creditos,semestre,requisitos});
  document.getElementById("nombreMateria").value="";
  document.getElementById("codigoMateria").value="";
  document.getElementById("creditosMateria").value="";
  document.getElementById("semestreMateria").value="";
  document.getElementById("requisitosMateria").value="";
}

/* ===== Inicializar ===== */
window.onload = cargarDatos;
