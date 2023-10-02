//target recebe um objeto com o método decorado, com o método que queremos implementar, o valida debito
//propertykey é o nome do método que está, no target será armazenado todo o método e o propertykey recebe apenas a sua chave e seu nome
// desciptor é um objeto do tipo PropertyDescriptor, que terá uma informação sobre o método como seu value.

export function ValidaDebito (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    //validação 
    descriptor.value = function(valorDoDebito: number){
        if (valorDoDebito <= 0) {
            throw new Error("O valor a ser debitado precisa ser maior do que zero!");
        }
        if (valorDoDebito > this.saldo) {
            throw new Error("Seu saldo é insuficiente!");
        }
        return originalMethod.apply(this, [valorDoDebito]);
    }
    return descriptor;
}
 