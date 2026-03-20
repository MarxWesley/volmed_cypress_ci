import { fakerPT_BR as faker } from "@faker-js/faker";

export default function CompanyDataFaker() {
    return ({
        companyNameFaker: faker.company.name(),
        cnpjFaker: faker.helpers.replaceSymbols('##.###.###/####-##'),
        emailFaker: faker.internet.email(),
        senhaFaker: faker.internet.password(8, true, /[A-Za-z0-9]/),
        telefoneFaker: faker.phone.number('519########'),
        cepFaker: faker.location.zipCode('#####-###'),
        ruaFaker: faker.location.street(),
        numeroFaker: faker.location.buildingNumber(),
        complementoFaker: faker.location.secondaryAddress(),
        estadoFaker: faker.location.state(),
        cidadeFaker: faker.location.city(),
    })
}