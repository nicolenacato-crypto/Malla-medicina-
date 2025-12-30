  let malla = JSON.parse(localStorage.getItem("malla")) || [];

const form = document.getElementById("formMateria");
const contenedor = document.getElementById("contenedor");

form.addEventListener("submit", e=>{
  e.preventDefault();
  const semestre = parseInt(document.getElementById("semestreInput").value);
  const nombre = document.getElementById("nombreInput").value.trim();
  const creditos = parseInt(document.getElementById("creditosInput").value);
  const requisitos = document.getElementById("requisitosInput").value.trim();
  if(!semestre || !nombre || !creditos) return alert("Completa todos los campos");
  agregarMateria(semestre,nombre,creditos,requisitos);
  form.reset();
});

function agregarMateria(semestre,nombre,creditos,requisitos=""){
  let sem = malla.find(s=>s.semestre===semestre);
  if(!sem){ sem={semestre, materias:[]}; malla.push(sem); }
  sem.materias.push({nombre,creditos,requisitos,p1:0,p2:0,p3:0,aprobada:false});
  guardarMalla();
  renderizarMalla();
}

function renderizarMalla(){
  contenedor.innerHTML="";
  malla.sort((a,b)=>a.semestre-b.semestre);
  malla.forEach(s=>{
    const divS=document.createElement("div");
    divS.className="semestre";
    divS.dataset.semestre=s.semestre;
    divS.innerHTML=`<h2>Semestre ${s.semestre}</h2>`;
    
    s.materias.forEach((m,index)=>{
      const divM=document.createElement("div");
      divM.className="materia";
      divM.dataset.semestre=s.semestre;
      divM.dataset.requisitos=m.requisitos;
      divM.innerHTML=`
        <h3>${m.nombre}</h3>
        <small>${m.creditos} créditos</small>
        <p>Requisitos: ${m.requisitos || "Ninguno"}</p>
        <div class="progresos">
          <input type="number" class="p1" min="0" max="10" placeholder="P1" value="${m.p1}">
          <input type="number" class="p2" min="0" max="10" placeholder="P2" value="${m.p2}">
          <input type="number" class="p3" min="0" max="10" placeholder="P3" value="${m.p3}">
        </div>
        <p class="nota-final">Nota final: <span>${calcularNota(m.p1,m.p2,m.p3)}</span></p>
        <button class="editar">Editar</button>
        <button class="eliminar">Eliminar</button>
      `;

      // Cambiar notas
      divM.querySelectorAll(".progresos input").forEach(input=>{
        input.addEventListener("input",()=>{
          m.p1=parseFloat(divM.querySelector(".p1").value)||0;
          m.p2=parseFloat(divM.querySelector(".p2").value)||0;
          m.p3=parseFloat(divM.querySelector(".p3").value)||0;
          divM.querySelector("span").textContent=calcularNota(m.p1,m.p2,m.p3);
          m.aprobada=(m.p1*0.25+m.p2*0.35+m.p3*0.4)>=7;
          actualizarBloqueos();
          guardarMalla();
          actualizarProgreso();
        });
      });

      // Botón eliminar
      divM.querySelector(".eliminar").addEventListener("click",()=>{
        if(confirm("¿Eliminar esta materia?")){
          s.materias.splice(index,1);
          guardarMalla();
          renderizarMalla();
        }
      });

      // Botón editar
      divM.querySelector(".editar").addEventListener("click",()=>{
        const nuevoNombre = prompt("Nombre de la materia:", m.nombre);
        if(nuevoNombre) m.nombre = nuevoNombre;
        const nuevosCreditos = prompt("Créditos:", m.creditos);
        if(nuevosCreditos) m.creditos = parseInt(nuevosCreditos);
        const nuevosReq = prompt("Requisitos (coma separada):", m.requisitos);
        if(nuevosReq!==null) m.requisitos = nuevosReq;
        guardarMalla();
        renderizarMalla();
      });

      divS.appendChild(divM);
    });

    contenedor.appendChild(divS);
  });
  actualizarBloqueos();
  actualizarProgreso();
}

function calcularNota(p1,p2,p3){
  return (p1*0.25+p2*0.35+p3*0.4).toFixed(2);
}

function actualizarBloqueos(){
  document.querySelectorAll(".materia").forEach(div=>{
    const reqs = div.dataset.requisitos;
    if(!reqs){ div.classList.remove("bloqueada"); return; }
    const lista = reqs.split(",");
    const ok = lista.every(r=>{
      const m = [...document.querySelectorAll(".materia")].find(x=>x.querySelector("h3").textContent.trim()===r.trim());
      return m && m.classList.contains("aprobada");
    });
    div.classList.toggle("bloqueada",!ok);
    if(div.querySelector("span").textContent>=7) div.classList.add("aprobada");
    else div.classList.remove("aprobada");
  });
}

function actualizarProgreso(){
  let total=0, suma=0;
  malla.forEach(s=>s.materias.forEach(m=>{
    suma+=1;
    const nota=parseFloat(calcularNota(m.p1,m.p2,m.p3));
    if(nota>=7) total+=1;
  }));
  const progreso = suma===0?0:Math.round(total/suma*100);
  document.getElementById("progresoTotal").textContent=progreso+"%";
}

function guardarMalla(){
  localStorage.setItem("malla",JSON.stringify(malla));
}

function mostrarSolo(n){
  document.querySelectorAll(".semestre").forEach(s=>{
    s.style.display = s.dataset.semestre==n?"block":"none";
  });
}

function mostrarTodo(){
  document.querySelectorAll(".semestre").forEach(s=>s.style.display="block");
}

// Renderizar al cargar
renderizarMalla();
