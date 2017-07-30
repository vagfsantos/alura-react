export default class TratadorErrors {
    publicaErros(erros) {
        for(var i = 0; i < erros.errors.length; i++) {
            var erro = erros.errors[i];
            console.log(erro);
        }
    }
}