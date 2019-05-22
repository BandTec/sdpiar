pf = () => {
    pessoaj.style.display = 'none';
    pessoaf.style.display = 'inline';
    btpf.disabled = true;
    btpj.disabled = false;

  }
  pj = () => {
    pessoaj.style.display = 'inline';
    pessoaf.style.display = 'none';
    btpf.disabled = false;
    btpj.disabled = true;
  }
