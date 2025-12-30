const contenedor = document.getElementById("contenedor");

/* ===== CREAR MALLA ===== */
data.forEach((s, semIndex) => {
  s.materias.forEach(m => {
    const mat = document.createElement("div");
    mat.className = "materia-columna bloqueada";
    mat.dataset.id = m.codigo;
    mat.dataset.semestre = semIndex + 1;
    mat.dataset.requisitos = ""; // luego puedes llenar

    mat.innerHTML = `
      <h3>${m.nombre}</h3>
      <p class="semestre-label">Semestre ${semIndex + 1}</p>
      <small>${m.codigo} | ${m.creditos} créditos</small>

      <div class="progresos">
        <input class="p1" type="number" min="0" max="10" placeholder="P1">
        <input class="p2" type="number" min="0" max="10" placeholder="P2">
        <input class="p3" type="number" min="0" max="10" placeholder="P3">
      </div>

      <p class="nota-final">Nota final: <span>0.00</span></p>
    `;

    contenedor.appendChild(mat);
  });
});

/* ===== CALCULAR NOTA ===== */
function calcularNota(materia) {
  const p1 = parseFloat(materia.querySelector(".p1").value) || 0;
  const p2 = parseFloat(materia.querySelector(".p2").value) || 0;
  const p3 = parseFloat(materia.querySelector(".p3").value) || 0;

  const nota = p1 * 0.25 + p2 * 0.35 + p3 * 0.40;
  materia.querySelector("span").textContent = nota.toFixed(2);

  materia.classList.toggle("aprobada", nota >= 7);
  materia.classList.toggle("reprobada", nota < 7);

  guardarDatos();
  actualizarBloqueos();
}

/* ===== BLOQUEO POR PRERREQUISITOS ===== */
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

/* ===== GUARDAR NOTAS ===== */
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

/* ===== CARGAR NOTAS ===== */
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
const materias = [
  { codigo: "MED101", nombre: "Anatomía I", semestre: 1 },
  { codigo: "MED201", nombre: "Anatomía II", semestre: 2 },
  { codigo: "MED301", nombre: "Fisiología I", semestre: 3 }
];

const contenedor = document.getElementById("contenedor-semestres");
let estado = JSON.parse(localStorage.getItem("malla")) || {};

/* ===== Crear materias dinámicamente ===== */
materias.forEach(m => {
  if (!estado[m.codigo]) estado[m.codigo] = { p1: 0, p2: 0, p3: 0, requisitos: [], aprobada: false };

  const div = document.createElement("div");
  div.className = "materia-columna bloqueada";
  div.dataset.id = m.codigo;
  div.dataset.semestre = m.semestre;
  div.innerHTML = `
    <h3>${m.nombre}</h3>
    <small>${m.codigo}</small>
    <div class="progresos">
      <input class="p1" type="number" min="0" max="10" value="${estado[m.codigo].p1}">
      <input class="p2" type="number" min="0" max="10" value="${estado[m.codigo].p2}">
      <input class="p3" type="number" min="0" max="10" value="${estado[m.codigo].p3}">
    </div>
    <p>Nota final: <span>${calcularNota(estado[m.codigo].p1, estado[m.codigo].p2, estado[m.codigo].p3)}</span></p>
    <p>Prerrequisitos:</p>
    <select multiple class="requisitos"></select>
  `;
  contenedor.appendChild(div);
});

/* ===== Calcular nota ===== */
function calcularNota(p1, p2, p3) {
  return (p1*0.25 + p2*0.35 + p3*0.40).toFixed(2);
}

/* ===== Guardar y cargar ===== */
function guardar() { localStorage.setItem("malla", JSON.stringify(estado)); }

/* ===== Eventos inputs ===== */
document.querySelectorAll(".materia-columna").forEach(div => {
  const inputs = div.querySelectorAll("input");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const codigo = div.dataset.id;
      estado[codigo].p1 = parseFloat(div.querySelector(".p1").value) || 0;
      estado[codigo].p2 = parseFloat(div.querySelector(".p2").value) || 0;
      estado[codigo].p3 = parseFloat(div.querySelector(".p3").value) || 0;
      div.querySelector("span").textContent = calcularNota(estado[codigo].p1, estado[codigo].p2, estado[codigo].p3);
      estado[codigo].aprobada = calcularNota(estado[codigo].p1, estado[codigo].p2, estado[codigo].p3) >= 7;
      guardar();
      verificarBloqueos();
    });
  });
});

/* ===== Bloqueo por prerrequisitos ===== */
function verificarBloqueos() {
  document.querySelectorAll(".materia-columna").forEach(div => {
    const codigo = div.dataset.id;
    const reqs = estado[codigo].requisitos;
    const ok = reqs.every(r => estado[r]?.aprobada);
    div.classList.toggle("bloqueada", !ok);
  });
}

window.onload = verificarBloqueos;
/* ===== EVENTOS ===== */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".materia-columna input").forEach(i => {
    i.addEventListener("input", () => {
      calcularNota(i.closest(".materia-columna"));
    });
  });
  cargarDatos();
});

