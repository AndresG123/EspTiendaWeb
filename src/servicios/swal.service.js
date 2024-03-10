import Swal from 'sweetalert2';

export const SwalError=(mensaje)=>{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: mensaje,
      });
}