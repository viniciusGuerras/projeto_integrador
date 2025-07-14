const db = require("../config/db");

exports.reservationReportQuery = async ({ type = 'all', sortBy = 'nome', sortOrder = 'ASC', ativo = true
} = {}) => {
    const validTypes = ['sala', 'material'];
    const validSortBy = ['nome', 'matricula', 'horario'];
    const validSortOrder = ['ASC', 'DESC'];

    console.log("Input params:", { type, sortBy, sortOrder, ativo });

    const finalType = validTypes.includes(type) ? type : 'all';
    const sortColumn = validSortBy.includes(sortBy) ? sortBy : 'nome';
    const order = validSortOrder.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

    let sortByOption;

    if (sortColumn == "horario") {
        sortByOption = "pa.hraula"
    }
    else {
        sortByOption = `u.${sortColumn}`;
    }

    let query;
    let result;

    if (finalType === 'sala') {
        query = `
        SELECT 
            'sala' AS tipo,
            u.nome,
            u.matricula,
            pa.nmrsala AS item,
            pa.hraula AS horario,
            pa.turma,
            pa.disciplina,
            pa.qtdaula,
            pa.dthoradevolus AS data_devolucao
        FROM prg_aula pa
        JOIN users u ON pa.userm = u.matricula
        WHERE pa.ativo = ${ativo}
        ORDER BY ${sortByOption} ${order};
        `;

        console.log("Executing query for 'sala':", query);
        result = await db.query(query);
    }else if (finalType === 'material') {
        query = `
            SELECT 
                'material' AS tipo,
                u.nome,
                u.matricula,
                rm.nmrm AS item,
                rm.hraula AS horario,
                pr.turma,
                pr.disciplina,
                pr.qtdaula,
                rm.dtddevolum AS data_devolucao
            FROM rsr_material rm
            JOIN users u ON rm.userm = u.matricula
            JOIN prg_aula pr ON rm.userm = pr.userm AND rm.hraula = pr.hraula
            WHERE rm.ativo = ${ativo}
            ORDER BY ${sortByOption} ${order};
            `;
        console.log("Executing query for 'material':", query);
        result = await db.query(query);
    } else {
        query = `
      (
        SELECT 
          'sala' AS tipo,
          u.nome,
          u.matricula,
          pa.nmrsala AS item,
          pa.hraula AS horario,
          pa.turma,
          pa.disciplina,
          pa.qtdaula,
          pa.dthoradevolus AS data_devolucao
        FROM prg_aula pa
        JOIN users u ON pa.userm = u.matricula
        WHERE pa.ativo = ${ativo}
      )
      UNION ALL
      (
        SELECT 
          'material' AS tipo,
          u.nome,
          u.matricula,
          rm.nmrm AS item,
          rm.hraula AS horario,
            pr.turma,
            pr.disciplina,
            pr.qtdaula,
          rm.dtddevolum AS data_devolucao
        FROM rsr_material rm
        JOIN users u ON rm.userm = u.matricula
        JOIN prg_aula pr ON rm.userm = pr.userm AND rm.hraula = pr.hraula
        WHERE rm.ativo = ${ativo}
      )
      ORDER BY ${sortBy} ${order};
    `;
        console.log("Executing combined query (sala + material):", query);
        result = await db.query(query);
    }

    console.log("Query result row count:", result);
    return result;
};
