//imports de Material UI
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from "@mui/material"

//import de datos de las categorias
import { Categories } from "../../constantes/data"

//---------------------------------------------
// Estilos personalizados con styled-components
//---------------------------------------------
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

    return(

        <>
            {/* Botón para crear una nueva entrada */}
            <CrearButton variant="contained">Crear una entrada</CrearButton>

            {/* Tabla que muestra todas las categorías disponibles */}
            <Tabla>
                {/* Encabezado de la tabla */}
                <TableHead>
                    <TableRow>
                        <TableCell>Todas las categorias</TableCell>
                    </TableRow>
                </TableHead>
                 {/* Itera sobre las categorías y crea una fila por cada una */}
                <TableBody>
                    {
                        Categories.map(Category => (

                            <TableRow key={Category.id}>
                                <TableCell>
                                    {Category.type}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Tabla>
        </>

    )
}

//export del componente
export default Categorias;