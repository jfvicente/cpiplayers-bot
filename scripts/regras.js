//  Description:
//    Checks the behavior of the Agile Promoters
//  Commands:

//    fala bixo

// o que está ouvindo
const COMMANDS = {
  HELLO: /informe as regras/i,
};

// Lógica da ação do bot
const _msgInicial = (msg) => {
  msg.reply(`Seja Bem-vindo ao CPI! Nós somos um Clã Privado, não público . Ser recrutado e se manter membro é uma Honra, não um Direito !

O Clã Primeiro Império foi fundado em 2016, e é um Clã MULTI-JOGOS Online FORFUN (Sem Obrigações de Treinamento) composto por membros do público jovem e adulto, na sua maioria geeks, apreciadores de boas séries e filmes, brincalhões, parceiros e, claro, viciados em VIDEO-GAME. 
No momento, nossa principal forma de manter contato é através do grupo de WHATSAPP do CLÃ*e pela própria *XBOX LIVE. Conversamos diariamente  sobre jogos, filmes, e diversos assuntos variados. Temos todos opiniões bem formadas e claro que nem sempre coincidirão com 100% dos membros, mas mantendo sempre o RESPEITO e o principal ideal do clã, a UNIÃO! 
	
Dito isso, é crucial ENTENDER e ACEITAR os REQUISITOS para PARTICIPAÇÃO do CLÃ e GRUPO de WHATSAPP :

- Clã FOR FUN situado APENAS no XBOX ONE (não recrutamos jogadores para competições);
- PROIBIDA a entrada de MENORES de 16 ANOS (será descoberto e expulso);
- NÃO há OBRIGATORIEDADE para jogar jogos PREDETERMINADOS (o clã quer abrangir todo o Xbox One );
- OBRIGATÓRIO*uso de *HEADSET durante jogo (se não gosta de conversar ou fazer amizades, não entre no clã);
- DURAÇÃO de RECRUTAMENTO Mínima de 30 DIAS ;
- Detenha Conhecimento das REGRAS. DESCULPAS por FALTA de CONHECIMENTO das MESMAS NÃO SERÃO ACEITAS.

RECRUTAS E MEMBROS DEVEM ESTAR DENTRO DOS PADRÕES DO CLÃ (REGRAS)

1º RESPEITO EM PRIMEIRO LUGAR:
	- O foco do clã é AMIZADE e INTEGRAÇÃO ;
	- RESPEITE TODOS os membros com EMPATIA , IGUALDADE e DIGNIDADE ;
	- Mais que jogadores... somos AMIGOS ... mais que AMIGOS ... somos IRMÃOS ;
	- ASSUNTOS referentes a POLÍTICA , RELIGIÃO , APOLOGIA às DROGAS , PORNOGRAFIA e QUALQUER TIPO de PRECONCEITO (homofobia, xenofobia, machismo, feminismo etc..) NÃO SERÃO TOLERADOS;
      - PROIBIDO SPOILER de FILMES , SÉRIES , LIVROS e JOGOS.
	- A PARTICIPAÇÃO no GRUPO de WHATSAPP e LIVE, é ESSENCIAL para PERMANÊNCIA no clã;
	- Em JOGOS que tenham OPÇÃO de AVATAR , é OBRIGATÓRIO o USO da IMAGEM fornecida pelo CLÃ ;
	- AMIGOS com MAIS INTIMIDADE irão brincar entre si PORTANTO, NÃO tome DORES de outro MEMBRO. Caso a vítima da brincadeira sentir - se desrespeitada,  a mesma irá se reportar à direção. 
Os DIRETORES serão os RESPONSÁVEIS por tomar as MEDIDAS CABÍVEIS , NÃO VOCÊ ! Lembre-se disso!

2º RECRUTAMENTO:
	- Os NOVOS RECRUTAS serão adicionados a um GRUPO PARALELO ;
	- Ficarão no grupo por, no MÍNIMO 30 DIAS ;
	- Neste grupo estão alguns DIRETORES responsáveis diretamente por recrutamento: Eddie, Liran, Thiago Nunes, Tiago e Vyctor;
	- Os RECRUTAS serão apresentados a eles e convidados a jogar com os mesmos, sendo aos poucos, integrados;
	- RECRUTAS NÃO são proibidos de jogar com membros;
	- SOMENTE APÓS APROVAÇÃO*discutida na DIRETORIA , o recruta poderá mudar a *GAMERTAG e ser promovido ao GRUPO PRINCIPAL 
NÃO É AUTORIZADO A TROCA ANTES DISSO!;
	- A GAMERTAG é OBRIGATÓRIA para TODOS. 
	- Portanto APÓS aprovação o RECRUTA terá um PRAZO X para A TROCA DA GAMERTAG, sob pena de expulsão do recrutamento. 

3º CAMPEONATOS:
	- Campeonatos serão realizados com prazo de 45 dias entre eles;
	- SÓ poderão PARTICIPAR MEMBROS que POSSUAM a GAMERTAG CPI. Ela é sua REFERÊNCIA para MEMBROS e ADVERSÁRIOS ;
	- Para INSCRIÇÃO no campeonato será utilizada uma PLANILHA GOOGLE , onde haverá descrição e requisitos para a mesma;
	- Haverão PENALIDADES em caso de DESISTÊNCIA EM CIMA DA HORA, FALTA INJUSTIFICADA*OU *AUSÊNCIA  de PARTICIPAÇÃO  MÍNIMA necessária para REALIZAÇÃO do CAMPEONATO . 

4º PUNIÇÕES:
	- ADVERTÊNCIA 1: Será chamada a atenção em PARTICULAR;
	- ADVERTÊNCIA 2: Será chamada a atenção em REUNIÃO entre membro INFRATOR e DIRETORES.;
	- PUNIÇÃO : Em REUNIÃO da DIREÇÃO , será definida PUNIÇÃO e PRAZO da mesma.
	ATENÇÃO: Se decidido em REUNIÃO dos DIRETORES, ALGUNS AGRAVANTES NÃO terão DUAS ADVERTÊNCIAS, e poderá haver a EXPULSÃO DO(S) INFRATORE(S).

Atenciosamente, 
A Direção.`);
}


// Como e o que a gente passa para a função
const _saudacao = msg => _msgInicial(msg);

//const _link = msgLink => _msgLink(msgLink);

module.exports = (robot) => {
  robot.respond(COMMANDS.HELLO, _saudacao);
};
