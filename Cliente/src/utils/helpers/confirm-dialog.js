import Swal from "sweetalert2";

export const confirmDelete = async (term = 'estudiante') => {
    const { isConfirmed } = await Swal.fire({
        title: `¿Esta seguro de querer eliminar a este ${term}?`,
        text: 'Esta operacion no podrá deshacerse',
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Si',
        showCancelButton: true,
        cancelButtonText: 'No'
    });

    return isConfirmed;
}