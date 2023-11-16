
const tabla = document.getElementById("tabla-contenido");
const boton = document.getElementById("btn-calcular");

const inputX1 = document.getElementById("x1");
const inputY1 = document.getElementById("y1");
const inputZ1 = document.getElementById("z1");

const inputX2 = document.getElementById("x2");
const inputY2 = document.getElementById("y2");
const inputZ2 = document.getElementById("z2");

const inputX3 = document.getElementById("x3");
const inputY3 = document.getElementById("y3");
const inputZ3 = document.getElementById("z3");

boton.addEventListener("click", Gauss_Seidel([0, 0, 0]));

//inicializar el arreglo con los valores iniciales de x, y, z
var arregloDatos = [ 0, 0, 0 ];
//definicion de la tolerancia
var tolerancia = 0.00001;

function mayorX(){

    if(inputX1.value>inputX2.value && inputX1.value>inputX3.value){
        return [inputX1.value, inputY1.value, inputZ1.value];
    }
    if(inputX2.value>inputX1.value && inputX2.value>inputX3.value){
        return [inputX2.value, inputY2.value, inputZ2.value];
    }
    if(inputX3.value>inputX1.value && inputX3.value>inputX2.value){
        return [inputX3.value, inputY3.value, inputZ3.value];
    }
    return [0, 0, 0];

}

function trdunc (x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
  }

//metodos para calcular x, y, z --- Estos estan basados en un ejemplo de clase
function CalcularX( y,  z)
{
    /*algo así va la idea para hacerlo dinamico
    var resultado = 0
    var cocientes = mayorX();
    resultado = (y+z)/cocientes;
    return resultado;*/
    return (3 - y - 2 * z) / 10;
}

function CalcularY(x, z)
{
    return (9 - 4 * x + z) / 6;
}

function CalcularZ( x, y)
{
    return (51 + 2 * x - 3 * y) / 8;
}

//verificacion que se compla la tolerancia
function VerificarTolerancia(a, b)
{
    
    if (Math.abs(a-b) <= 0.00001)
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
        //seguir en caso que no se hayan cumplido todas las tolerancias
        Gauss_Seidel(arregloNuevo);
    }

    

}