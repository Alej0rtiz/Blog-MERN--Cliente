//imports de Material UI
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from "@mui/material"

//import de datos de las categorias
import { Categories } from "../../constantes/data"

import { Link, useSearchParams } from "react-router-dom"

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------

//mejora en los estilos pendiente
const Tabla = styled(Table)`

    margin-top: 20px;
    min-width: 80%;
    background-color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 4px 12px rgba(110, 68, 255, 0.2);   
    
    th {
    background: linear-gradient(90deg, #4b0081, #650099, #7f00b2);
    color: #f5f5f5;
    font-weight: bold;
    font-size: 1.1rem;
    }

    td {
    font-size: 1rem;
    color: #333333;
    }

    tr:nth-of-type(even) {
    background-color: #f7f7f7; /* gris muy claro para filas pares */
    }

    tr:hover {
    background-color: #e0d7ff; /* leve morado claro al hacer hover */
    }
`;

const CrearButton = styled(Button)`
    background:  #6e44ff;
    color: #ffffff;
    font-weight: bold;
    text-transform: none;
    padding: 10px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0px 4px 8px rgba(110, 68, 255, 0.3);
    transition: 0.1s ease;
`;

const Categorias = () => {

    // Hook para leer parámetros de la URL
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category'); // Obtiene la categoría actual (si existe)

    return(

        <>
            {/* Botón para crear una nueva entrada */}
            <Link to={`/create?category=${category || ''}`}>
            <CrearButton variant="contained">Crear una entrada</CrearButton>
            </Link>

            {/* Tabla que muestra todas las categorías disponibles */}
            <Tabla>
                {/* Encabezado de la tabla */}
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link to={'/'}>Todas las categorias</Link>
                        </TableCell>
                    </TableRow>
                </TableHead>

                {/* Cuerpo de la tabla: muestra cada categoría */}
                {/* Itera sobre las categorías y crea una fila por cada una */}
                <TableBody>
                    {
                        Categories.map(category => (

                            <TableRow key={category.id}>
                                <TableCell>
                                <Link to={`/?category=${category.type}`}>
                                    {category.type}
                                </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Tabla>
        </>

    )
}

//export del componente para su uso externo
export default Categorias;