// Datos de ejemplo, puedes agregar más materias y semestres
const data = [
  { semestre: "1", materias: [
    { nombre:"Química General", codigo:"MED101", creditos:5, requisitos:[] },
    { nombre:"Anatomía I", codigo:"MED102", creditos:6, requisitos:[] }
  ]},
  { semestre: "2", materias: [
    { nombre:"Bioquímica", codigo:"MED201", creditos:5, requisitos:["MED101"] },
    { nombre:"Anatomía II", codigo:"MED202", creditos:6, requisitos:["MED102"] }
  ]}
];

const contenedor = document.getElementById("contenedor");

// Crear semestres y materias dinámicamente
data.forEach(s => {
  const divSemestre = document.createElement("div");
  divSemestre.className = "semestre";
  divSemestre.dataset.semestre = s.semestre;
  divSemestre.innerHTML = `<h2>Semestre ${s.semestre}</h2>`;

  s.materias.forEach(m => {
    const mat = document.createElement("div");
    mat.className = "materia-columna";
    mat.dataset.id = m.codigo;
    mat.dataset.requisitos = m.requisitos.join(",");

    mat.innerHTML = `
      <h3>${m.nombre}</h3>
      <small>${m.codigo} | ${m.creditos} créditos</small>
      <div class="progresos">
        <input class="p1" type="number" min="0" max="10" placeholder="P1">
        <input class="p2" type="number" min="0" max="10" placeholder="P2">
        <input class="p3" type="number" min="0" max="10" placeholder="P3">
      </div>
      <p class="nota-final">Nota final: <span>0.00</span></p>
    `;

    divSemestre.appendChild(mat);
  });

  contenedor.appendChild(divSemestre);
});

// Calcular nota y actualizar estados
function calcularNota(materia) {
  const p1 = parseFloat(materia.querySelector(".p1").value) || 0;
  const p2 = parseFloat(materia.querySelector(".p2").value) || 0;
  const p3 = parseFloat(materia.querySelector(".p3").value) || 0;
  const nota = p1*0.25 + p2*0.35 + p3*0.40;

  materia.querySelector("span").textContent = nota.toFixed(2);

  materia.classList.toggle("aprobada", nota >= 7);
  materia.classList.toggle("reprobada", nota < 7);

  guardarDatos();
  actualizarBloqueos();
}

// Guardar notas en localStorage
function guardarDatos() {
  const datos = {};
  document.querySelectorAll(".materia-columna").forEach(m => {
    datos[m.dataset.id] = {
      p1: m.querySelector(".p1").value,
      p2: m.querySelector(".p2").value,
      p3: m.querySelector(".p3").value
    };
  });
  localStorage.setItem("notasMalla", JSON.stringify(datos));
}

// Cargar notas desde localStorage
function cargarDatos() {
  const datos = JSON.parse(localStorage.getItem("notasMalla")) || {};
  document.querySelectorAll(".materia-columna").forEach(m => {
    if (!datos[m.dataset.id]) return;
    m.querySelector(".p1").value = datos[m.dataset.id].p1;
    m.querySelector(".p2").value = datos[m.dataset.id].p2;
    m.querySelector(".p3").value = datos[m.dataset.id].p3;
    calcularNota(m);
  });
}

// Bloquear materias según prerrequisitos
function actualizarBloqueos() {
  document.querySelectorAll(".materia-columna").forEach(m => {
    const reqs = m.dataset.requisitos;
    if (!reqs) {
      m.classList.remove("bloqueada");
      return;
    }
    const ok = reqs.split(",").every(id => {
      const r = document.querySelector(`[data-id="${id}"]`);
      return r && r.classList.contains("aprobada");
    });
    m.classList.toggle("bloqueada", !ok);
  });
}

// Eventos input
document.querySelectorAll(".materia-columna").forEach(m => {
  m.querySelectorAll("input").forEach(i => {
    i.addEventListener("input", () => calcularNota(m));
  });
});

// Mostrar semestres
function mostrarSolo(n) {
  document.querySelectorAll(".semestre").forEach(s => {
    s.style.display = s.dataset.semestre == n ? "block" : "none";
  });
}
function mostrarTodo() {
  document.querySelectorAll(".semestre").forEach(s => s.style.display = "block");
}

// Cargar datos al inicio
window.onload = () => {
  cargarDatos();
  actualizarBloqueos();
};
