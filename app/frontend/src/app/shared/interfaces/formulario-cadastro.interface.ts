interface IFormularioPessoa {
  nome: string;
  email: string;
  telefone: string;
}

export interface IFormularioPJ extends IFormularioPessoa {
  cnpj: string;
}

export interface IFormularioPF extends IFormularioPessoa {
  cpf: string;
}

export interface IFormularioFornecedor extends IFormularioPJ {
  tipoServico: string;
}

export interface IFormularioProfessor extends IFormularioPF {
  disciplinasMinistradas: string[];
  diploma: File;
}

export interface IFormularioAluno extends IFormularioPF {
  curso: string;
  comprovanteEnsinoMedio: File;
}

export type FormularioCadastro = IFormularioFornecedor | IFormularioProfessor | IFormularioAluno;
