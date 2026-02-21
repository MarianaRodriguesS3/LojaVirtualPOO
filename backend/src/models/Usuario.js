const bcrypt = require('bcryptjs');

class Usuario {
  #id;
  #nome;
  #email;
  #senha;

  constructor(id, nome, email, senhaHash) {
    this.#id = id;
    this.#nome = nome;
    this.#email = email;
    this.#senha = senhaHash;
  }

  get id() { return this.#id; }
  get nome() { return this.#nome; }
  get email() { return this.#email; }
  get senha() { return this.#senha; }

  async setSenha(senha) {
    this.#senha = await bcrypt.hash(senha, 10);
  }

  async validarSenha(senha) {
    return await bcrypt.compare(senha, this.#senha);
  }

  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      email: this.#email
    };
  }
}

module.exports = Usuario;