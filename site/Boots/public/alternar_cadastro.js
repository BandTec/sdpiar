pf = () => {
    pessoaj.style.display = 'none';
    pessoaf.style.display = 'inline';
    btpf.disabled = true;
    btpj.disabled = false;
    document.getElementById("imagemCadastro").src="img/cadastro.png";
    document.getElementById("corFundo").classList.add('bg-gradient-primary');
    document.getElementById("corFundo").classList.remove('bg-gradient-primary2');
  }
  pj = () => {
    pessoaj.style.display = 'inline';
    pessoaf.style.display = 'none';
    btpf.disabled = false;
    btpj.disabled = true;
    document.getElementById("imagemCadastro").src="img/sdpiar.png";
    document.getElementById("corFundo").classList.add('bg-gradient-primary2');
    document.getElementById("corFundo").classList.remove('bg-gradient-primary');
  }
