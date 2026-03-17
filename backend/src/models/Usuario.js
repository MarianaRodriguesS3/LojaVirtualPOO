const bcrypt = require('bcryptjs');

class Usuario {
  #id;
  #nome;
  #email;
  #cpf;
  #senha;
  #endereco;

  constructor(id, nome, email, cpf, senhaHash, endereco = null) {
    this.#id = id;
    this.#nome = nome;
    this.#email = email;
    this.#cpf = cpf;
    this.#senha = senhaHash;
    this.#endereco = endereco;
  }

  get id() { return this.#id; }
  get nome() { return this.#nome; }
  get email() { return this.#email; }
  get cpf() { return this.#cpf; }
  get senha() { return this.#senha; }
  get endereco() { return this.#endereco; }

  async setSenha(senha) {
    this.#senha = await bcrypt.hash(senha, 10);
  }

  async validarSenha(senha) {
    return await bcrypt.compare(senha, this.#senha);
  }

  setEndereco(endereco) {
    this.#endereco = endereco;
  }

  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      email: this.#email,
      cpf: this.#cpf,
      endereco: this.#endereco
    };
  }
}

module.exports = Usuario;