const contenedor = document.getElementById("contenedor-semestres");

// Tu data con todos los semestres y materias
const data = [
  {
    semestre: "Semestre 1",
    materias: [
      { nombre:"Química General para Medicina", codigo:"MED101", creditos:5 },
      { nombre:"Anatomía Clínica e Imagenológica I", codigo:"MED102", creditos:6 },
      { nombre:"Histología", codigo:"MED103", creditos:4 },
      { nombre:"Psicología Médica", codigo:"MED104", creditos:3 },
      { nombre:"Historia del Conocimiento Médico", codigo:"MED105", creditos:3 },
      { nombre:"Aprendizaje Estratégico y Liderazgo", codigo:"UNI101", creditos:3 },
      { nombre:"Comunicación Efectiva", codigo:"UNI102", creditos:3 }
    ]
  },
  {
    semestre: "Semestre 2",
    materias: [
      { nombre:"Biología Celular y Molecular I", codigo:"MED201", creditos:5 },
      { nombre:"Anatomía Clínica e Imagenológica II", codigo:"MED202", creditos:6 },
      { nombre:"Embriología", codigo:"MED203", creditos:4 },
      { nombre:"Neuroanatomía", codigo:"MED204", creditos:4 },
      { nombre:"Procedimientos Básicos I", codigo:"MED205", creditos:3 },
      { nombre:"Pensamiento Crítico Aplicado", codigo:"UNI201", creditos:3 },
      { nombre:"Interacción Social", codigo:"UNI202", creditos:3 }
    ]
  }
  // Agrega todos los semestres restantes
];

// Estado guardado en localStorage
let estado = JSON.parse(localStorage.getItem("malla")) || {};

/* ===== CREAR SEMESTRES Y MATERIAS ===== */
data.forEach((s, semIndex) => {
  const semDiv = document.createElement("div");
  semDiv.className = "semestre";
  semDiv.dataset.sem = semIndex + 1;
  semDiv.innerHTML = `<h2>${s.semestre}</h2>`;

  s.materias.forEach(m => {
    if (!estado[m.codigo]) estado[m.codigo] = { p1:0, p2:0, p3:0, requisitos: [], aprobada:false };

    const mat = document.createElement("div");
    mat.className = "materia-columna bloqueada";
    mat.dataset.id = m.codigo;
    mat.dataset.semestre = semIndex + 1;

    mat.innerHTML = `
      <h3>${m.nombre}</h3>
      <small>${m.codigo} | ${m.creditos} créditos</small>
      <div class="progresos">
        <input class="p1" type="number" min="0" max="10" value="${estado[m.codigo].p1}">
        <input class="p2" type="number" min="0" max="10" value="${estado[m.codigo].p2}">
        <input class="p3" type="number" min="0" max="10" value="${estado[m.codigo].p3}">
      </div>
      <p>Nota final: <span>${calcularNota(estado[m.codigo].p1,estado[m.codigo].p2,estado[m.codigo].p3)}</span></p>
      <p>Prerrequisitos:</p>
      <select multiple class="requisitos"></select>
    `;
    semDiv.appendChild(mat);
  });

  contenedor.appendChild(semDiv);
});

/* ===== RELLENAR SELECT DE PRERREQUISITOS ===== */
document.querySelectorAll(".materia-columna").forEach(div => {
  const select = div.querySelector("select.requisitos");
  const codigoActual = div.dataset.id;

  data.flatMap(s => s.materias)
      .filter(m => m.codigo !== codigoActual)
      .forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.codigo;
        opt.textContent = m.nombre;
        if (estado[codigoActual].requisitos.includes(m.codigo)) opt.selected = true;
        select.appendChild(opt);
      });

  select.addEventListener("change", () => {
    estado[codigoActual].requisitos = [...select.selectedOptions].map(o => o.value);
    guardar();
    verificarBloqueos();
  });
});

/* ===== CALCULAR NOTA ===== */
function calcularNota(p1, p2, p3){
  return (p1*0.25 + p2*0.35 + p3*0.40).toFixed(2);
}

/* ===== BLOQUEO POR PRERREQUISITOS ===== */
function verificarBloqueos(){
  document.querySelectorAll(".materia-columna").forEach(div => {
    const codigo = div.dataset.id;
    const reqs = estado[codigo].requisitos;
    const ok = reqs.every(r => estado[r]?.aprobada);
    div.classList.toggle("bloqueada", !ok);
  });
}

/* ===== EVENTOS INPUT PARA NOTAS ===== */
document.querySelectorAll(".materia-columna").forEach(div => {
  div.querySelectorAll("input").forEach(i => {
    i.addEventListener("input", ()=>{
      const codigo = div.dataset.id;
      estado[codigo].p1 = parseFloat(div.querySelector(".p1").value) || 0;
      estado[codigo].p2 = parseFloat(div.querySelector(".p2").value) || 0;
      estado[codigo].p3 = parseFloat(div.querySelector(".p3").value) || 0;

      const nota = calcularNota(estado[codigo].p1,estado[codigo].p2,estado[codigo].p3);
      div.querySelector("span").textContent = nota;
      estado[codigo].aprobada = nota >= 7;

      guardar();
      verificarBloqueos();
    });
  });
});

/* ===== GUARDAR ESTADO ===== */
function guardar(){
  localStorage.setItem("malla", JSON.stringify(estado));
}

/* ===== CARGAR DATOS ===== */
function cargarDatos(){
  document.querySelectorAll(".materia-columna").forEach(div=>{
    const codigo = div.dataset.id;
    div.querySelector(".p1").value = estado[codigo].p1;
    div.querySelector(".p2").value = estado[codigo].p2;
    div.querySelector(".p3").value = estado[codigo].p3;

    const nota = calcularNota(estado[codigo].p1,estado[codigo].p2,estado[codigo].p3);
    div.querySelector("span").textContent = nota;
    estado[codigo].aprobada = nota >= 7;
  });
  verificarBloqueos();
}

window.addEventListener("DOMContentLoaded", cargarDatos);
