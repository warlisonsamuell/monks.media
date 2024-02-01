const fs = require('fs');

// Função para ler e corrigir um arquivo
function lerECorrigirArquivo(nomeArquivo) {
  fs.readFile(nomeArquivo, 'utf8', (err, data) => {
    if (err) {
      console.error(`Erro ao ler o arquivo JSON ${nomeArquivo}:`, err);
      return;
    }

    try {
      const jsonContent = JSON.parse(data);

      // Realizar as substituições necessárias
      const jsonModificado = modificarConteudo(jsonContent);

      // Imprimir o resultado no console
      console.log(jsonModificado);

      // Exportar os dados corrigidos
      exportarDadosCorrigidos(`banco_corrigido_${nomeArquivo}`, jsonModificado);
    } catch (parseError) {
      console.error(`Erro ao fazer o parse do JSON do arquivo ${nomeArquivo}:`, parseError);
    }
  });
}

// Função para realizar as substituições de caracteres
function modificarConteudo(json) {
  const jsonModificado = JSON.parse(JSON.stringify(json, (key, value) => {
    if (typeof value === 'string') {
      // Realizar as substituições necessárias
      value = value.replace(/æ/g, 'a').replace(/ø/g, 'o');
    }
    return value;
  }));

  // Substituições de tipo
  return JSON.parse(JSON.stringify(jsonModificado, (key, value) => {
    const numero = parseFloat(value);
    if (!isNaN(numero)) {
      return numero;
    }
    return value;
  }));
}

// Função para exportar os dados corrigidos
function exportarDadosCorrigidos(nomeArquivo, dados) {
  const dadosExportados = JSON.stringify(dados, null, 2);

  fs.writeFile(`${nomeArquivo}.json`, dadosExportados, 'utf8', (err) => {
    if (err) {
      console.error(`Erro ao exportar os dados corrigidos para ${nomeArquivo}.json:`, err);
    } else {
      console.log(`Os dados corrigidos foram exportados para ${nomeArquivo}.json.`);
    }
  });
}

// Ler e corrigir o primeiro arquivo
lerECorrigirArquivo('broken_database_1.json');

// Ler e corrigir o segundo arquivo
lerECorrigirArquivo('broken_database_2.json');
