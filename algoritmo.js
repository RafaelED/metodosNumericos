
const tabla = document.getElementById("tabla-contenido");
const boton = document.getElementById("btn-calcular");

const inputX1 = document.getElementById("x1");
const inputY1 = document.getElementById("y1");
const inputZ1 = document.getElementById("z1");
const inputA1 = document.getElementById("a1");

const inputX2 = document.getElementById("x2");
const inputY2 = document.getElementById("y2");
const inputZ2 = document.getElementById("z2");
const inputA2 = document.getElementById("a2");

const inputX3 = document.getElementById("x3");
const inputY3 = document.getElementById("y3");
const inputZ3 = document.getElementById("z3");
const inputA3 = document.getElementById("a3");

boton.addEventListener("click", ()=>{console.log(Gauss_Seidel([0, 0, 0]))});

//inicializar el arreglo con los valores iniciales de x, y, z
var arregloDatos = [ 0, 0, 0 ];
//definicion de la tolerancia
var tolerancia = 0.00001;

function mayorX(){

    var x1, x2, x3;
    x1=parseInt(inputX1.value);
    x2=parseInt(inputX2.value);
    x3=parseInt(inputX3.value);

    if(x1>x2 && x1>x3){
        return [parseInt(inputX1.value), parseInt(inputY1.value), parseInt(inputZ1.value), parseInt(inputA1.value)];
    }
    if(x2>x1 && x2>x3){
        return [parseInt(inputX2.value), parseInt(inputY2.value), parseInt(inputZ2.value), parseInt(inputA2.value)];
    }
    if(x3>x1 && x3>x2){
        return [parseInt(inputX3.value), parseInt(inputY3.value), parseInt(inputZ3.value), parseInt(inputA3.value)];
    }
    return [0, 0, 0, 0];

}

function mayorY(){

    var y1, y2, y3;
    y1=parseInt(inputY1.value);
    y2=parseInt(inputY2.value);
    y3=parseInt(inputY3.value);

    if(y1>y2 && y1>y3){
        return [parseInt(inputX1.value), parseInt(inputY1.value), parseInt(inputZ1.value), parseInt(inputA1.value)];
    }
    if(y2>y1 && y2>y3){
        return [parseInt(inputX2.value), parseInt(inputY2.value), parseInt(inputZ2.value), parseInt(inputA2.value)];
    }
    if(y3>y1 && y3>y2){
        return [parseInt(inputX3.value), parseInt(inputY3.value), parseInt(inputZ3.value), parseInt(inputA3.value)];
    }
    return [0, 0, 0, 0];

}

function mayorZ(){

    var z1, z2, z3;
    z1=parseInt(inputZ1.value);
    z2=parseInt(inputZ2.value);
    z3=parseInt(inputZ3.value);

    if(z1>z2 && z1>z3){
        return [parseInt(inputX1.value), parseInt(inputY1.value), parseInt(inputZ1.value), parseInt(inputA1.value)];
    }
    if(z2>z1 && z2>z3){
        return [parseInt(inputX2.value), parseInt(inputY2.value), parseInt(inputZ2.value), parseInt(inputA2.value)];
    }
    if(z3>z1 && z3>z2){
        return [parseInt(inputX3.value), parseInt(inputY3.value), parseInt(inputZ3.value), parseInt(inputA3.value)];
    }
    return [0, 0, 0, 0];

}

function truncar(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
  }

//metodos para calcular x, y, z --- Estos estan basados en un ejemplo de clase
function CalcularX( y,  z)
{
    //algo así va la idea para hacerlo dinamico
    var resultado = 0
    var cocientes = mayorX();
    resultado = (-y*cocientes[1]-z*cocientes[2]+cocientes[3])/cocientes[0];
    return resultado;
    //return (3 - y - 2 * z) / 10;
}

function CalcularY(x, z)
{   
    var resultado = 0
    var cocientes = mayorY();
    resultado = (-x*cocientes[0]-z*cocientes[2]+cocientes[3])/cocientes[1];
    return resultado;
    //return (9 - 4 * x + z) / 6;
}

function CalcularZ( x, y)
{
    var resultado = 0
    var cocientes = mayorZ();
    resultado = (-x*cocientes[0]-y*cocientes[1]+cocientes[3])/cocientes[2];
    return resultado;
    //return (51 + 2 * x - 3 * y) / 8;
}

//verificacion que se compla la tolerancia
function VerificarTolerancia(a, b)
{
    console.log(a.toFixed(6)+"-"+b.toFixed(6)+"="+Math.abs(a-b).toFixed(6));
    if (Math.abs(a-b).toFixed(6) <= 0.00001)
    {
        
        return true;
    }

    return false;
}

//metodo principal
function Gauss_Seidel(arregloAntiguo)
{
    var verificado = false;

    var arregloNuevo = [0, 0, 0 ];

    //calculo de las nuevas variables
    arregloNuevo[0] = CalcularX(arregloAntiguo[1], arregloAntiguo[2]);
    arregloNuevo[1] = CalcularY(arregloNuevo[0], arregloAntiguo[2]);
    arregloNuevo[2] = CalcularZ(arregloNuevo[0], arregloNuevo[1]);

    //impresiones en consola de los datos que se estan calculando
    
    console.log("-> ");
    
    var cadena="";

    for( i = 0;i<3;i++)
    {
        var valor = arregloNuevo[i].toFixed(2) ;
        console.log( valor+" ");
        cadena += "<td>"+valor+"</td>";
        //console.log("<td>"+valor+"</td>")

    }
    tabla.innerHTML += "<tr>"+cadena+"</tr>";

    console.log("");
    //llamada al metodo para ponerlos en la interfaz (incompleto)

    //verificacion que todas las variables cumplan con la tolerancia para cerrar el ciclo
    if (VerificarTolerancia(arregloAntiguo[0], arregloNuevo[0]) && VerificarTolerancia(arregloAntiguo[1], arregloNuevo[1]) && VerificarTolerancia(arregloAntiguo[2], arregloNuevo[2]))
    {
        verificado = true;
        console.log("El arreglo final es: ");
        console.log("-> " + Math.round(arregloNuevo[0],4) + " " + Math.round(arregloNuevo[1], 4) + " " + Math.round(arregloNuevo[2], 4));

    }

    if (!verificado)
    {
        console.log("vefificado x: "+VerificarTolerancia(arregloAntiguo[0], arregloNuevo[0]));
        console.log("vefificado y: "+VerificarTolerancia(arregloAntiguo[1], arregloNuevo[1]));
        console.log("vefificado z: "+VerificarTolerancia(arregloAntiguo[2], arregloNuevo[2]));
        //seguir en caso que no se hayan cumplido todas las tolerancias
        Gauss_Seidel(arregloNuevo);
    }

    

}