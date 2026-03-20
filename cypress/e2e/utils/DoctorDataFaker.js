import { fakerPT_BR as faker } from "@faker-js/faker";

export default function DoctorDataFaker() {
    return ({
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        senha: faker.internet.password(8, true, /[A-Za-z0-9]/),
        especialidade: faker.person.jobType(),
        CRM: faker.helpers.replaceSymbols('#####'),
        telefone: faker.phone.number('519########'),
        cep: faker.location.zipCode('#####-###'),
        rua: faker.location.street(),
        numero: faker.location.buildingNumber(),
        complemento: faker.location.secondaryAddress(),
        estado: faker.location.state(),
    })
}