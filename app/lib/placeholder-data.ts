// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const issuers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Bahrain National Bank',
    email: 'evil@rabbit.com',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'MedNet',
    email: 'delba@oliveira.com',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Axa',
    email: 'lee@robinson.com',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Next Insurance',
    email: 'michael@novotny.com',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Insurance',
    email: 'amy@burns.com',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Bahrain insurance ',
    email: 'balazs@orban.com',
  },
];

const policies = [
  {
    id: "b2b2b2b2-2222-2222-2222-222222222222", 
    issuer_id: issuers[0].id,
    name:'a',
    code: '15795',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222223", 
    issuer_id: issuers[1].id,
    name:'b',
    code: '20348',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222224", 
    issuer_id: issuers[4].id,
    name:'c',
    code: '3040',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222225", 
    issuer_id: issuers[3].id,
    name:'d',
    code: '44800',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222226", 
    issuer_id: issuers[5].id,
    name:'e',
    code: '34577',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222227", 
    issuer_id: issuers[2].id,
    name:'f',
    code: '54246',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222228", 
    issuer_id: issuers[0].id,
    name:'g',
    code: '666',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222229", 
    issuer_id: issuers[3].id,
    name:'h',
    code: '32545',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222230", 
    issuer_id: issuers[4].id,
    name:'I',
    code: '1250',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222231", 
    issuer_id: issuers[5].id,
    name:'G',
    code: '8546',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222232", 
    issuer_id: issuers[1].id,
    name:'k',
    code: '500',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222233", 
    issuer_id: issuers[5].id,
    name:'L',
    code: '8945',
  },
  {
    id: "b2b2b2b2-2222-2222-2222-222222222234", 
    issuer_id: issuers[2].id,
    name:'M',
    code: '1000',
  },
];

const policyDetails = [
  // Pair 1: Linked to policies[0] (name: 'a')
  {
    id: "c3c3c3c3-3333-3333-3333-333333333300",
    policy_id: policies[0].id,
    name: "Detail Sheet 1 for A",
    deductables: 250,
    coins: 70,
    max: 3000,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  {
    id: "c3c3c3c3-3333-3333-3333-333333333301",
    policy_id: policies[0].id,
    name: "Detail Sheet 2 for A",
    deductables: 300,
    coins: 80,
    max: 3250,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  // Pair 2: Linked to policies[1] (name: 'b')
  {
    id: "c3c3c3c3-3333-3333-3333-333333333302",
    policy_id: policies[1].id,
    name: "Detail Sheet 3 for B",
    deductables: 350,
    coins: 70,
    max: 3500,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  {
    id: "c3c3c3c3-3333-3333-3333-333333333303",
    policy_id: policies[1].id,
    name: "Detail Sheet 4 for B",
    deductables: 400,
    coins: 80,
    max: 3750,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  // Pair 3: Linked to policies[2] (name: 'c')
  {
    id: "c3c3c3c3-3333-3333-3333-333333333304",
    policy_id: policies[2].id,
    name: "Detail Sheet 5 for C",
    deductables: 450,
    coins: 70,
    max: 4000,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  {
    id: "c3c3c3c3-3333-3333-3333-333333333305",
    policy_id: policies[2].id,
    name: "Detail Sheet 6 for C",
    deductables: 500,
    coins: 80,
    max: 4250,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  // Pair 4: Linked to policies[3] (name: 'd')
  {
    id: "c3c3c3c3-3333-3333-3333-333333333306",
    policy_id: policies[3].id,
    name: "Detail Sheet 7 for D",
    deductables: 550,
    coins: 70,
    max: 4500,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  {
    id: "c3c3c3c3-3333-3333-3333-333333333307",
    policy_id: policies[3].id,
    name: "Detail Sheet 8 for D",
    deductables: 600,
    coins: 80,
    max: 4750,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  // Pair 5: Linked to policies[4] (name: 'e')
  {
    id: "c3c3c3c3-3333-3333-3333-333333333308",
    policy_id: policies[4].id,
    name: "Detail Sheet 9 for E",
    deductables: 650,
    coins: 70,
    max: 5000,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  {
    id: "c3c3c3c3-3333-3333-3333-333333333309",
    policy_id: policies[4].id,
    name: "Detail Sheet 10 for E",
    deductables: 700,
    coins: 80,
    max: 5250,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  // Pair 6: Linked to policies[5] (name: 'f')
  {
    id: "c3c3c3c3-3333-3333-3333-333333333310",
    policy_id: policies[5].id,
    name: "Detail Sheet 11 for F",
    deductables: 750,
    coins: 70,
    max: 5500,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  {
    id: "c3c3c3c3-3333-3333-3333-333333333311",
    policy_id: policies[5].id,
    name: "Detail Sheet 12 for F",
    deductables: 800,
    coins: 80,
    max: 5750,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  // Pair 7: Linked to policies[6] (name: 'g')
  {
    id: "c3c3c3c3-3333-3333-3333-333333333312",
    policy_id: policies[6].id,
    name: "Detail Sheet 13 for G",
    deductables: 850,
    coins: 70,
    max: 6000,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  {
    id: "c3c3c3c3-3333-3333-3333-333333333313",
    policy_id: policies[6].id,
    name: "Detail Sheet 14 for G",
    deductables: 900,
    coins: 80,
    max: 6250,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  // Pair 8: Linked to policies[7] (name: 'h')
  {
    id: "c3c3c3c3-3333-3333-3333-333333333314",
    policy_id: policies[7].id,
    name: "Detail Sheet 15 for H",
    deductables: 950,
    coins: 70,
    max: 6500,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  {
    id: "c3c3c3c3-3333-3333-3333-333333333315",
    policy_id: policies[7].id,
    name: "Detail Sheet 16 for H",
    deductables: 1000,
    coins: 80,
    max: 6750,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  // Pair 9: Linked to policies[8] (name: 'I')
  {
    id: "c3c3c3c3-3333-3333-3333-333333333316",
    policy_id: policies[8].id,
    name: "Detail Sheet 17 for I",
    deductables: 1050,
    coins: 70,
    max: 7000,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  {
    id: "c3c3c3c3-3333-3333-3333-333333333317",
    policy_id: policies[8].id,
    name: "Detail Sheet 18 for I",
    deductables: 1100,
    coins: 80,
    max: 7250,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  // Pair 10: Linked to policies[9] (name: 'G')
  {
    id: "c3c3c3c3-3333-3333-3333-333333333318",
    policy_id: policies[9].id,
    name: "Detail Sheet 19 for G",
    deductables: 1150,
    coins: 70,
    max: 7500,
    min: 100,
    coins2: 85,
    coins3: 95
  },
  {
    id: "c3c3c3c3-3333-3333-3333-333333333319",
    policy_id: policies[9].id,
    name: "Detail Sheet 20 for G",
    deductables: 1200,
    coins: 80,
    max: 7750,
    min: 100,
    coins2: 85,
    coins3: 95
  }
];



export { users, issuers, policies, policyDetails };
