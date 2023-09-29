import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getServiceOpen = async function () {

    try {

        const service = await prisma.tbl_diarista_servico.findMany({
            where: {
                id_servico: {
                    gt: 0,
                },
                id_diarista: {
                    equals: null,
                },
            },
            include: {
                FK_Servico_DiaristaServico: {
                    select: {
                        id: true,
                        data_hora: true,
                        observacao: true,
                        tarefas_adicionais: true,
                        FK_TipoLimpeza_Servico: {
                            select: {
                                nome: true
                            }
                        },
                        FK_ResidenciaCliente_Servico: {
                            select: {
                                FK_Cliente_Residencia: {
                                    select: {
                                        nome: true,
                                        biografia: true,
                                        foto_perfil: true
                                    }
                                }
                            }
                        }
                    },
                },
            },
        })

        const serviceClient = [];

        for (const it of service) {
            const serviceValue = await prisma.tbl_servico_com_valor.findFirst({
                where: {
                    id_servico: it.FK_Servico_DiaristaServico.id,
                },
                select: {
                    valor: true,
                },
            })

            const serviceRoom = await prisma.tbl_servico_comodo.findMany({
                where: {
                    id_servico: it.FK_Servico_DiaristaServico.id,
                },
                include: {
                    FK_Comodo_ServicoComodo: {
                        select: {
                            nome: true,
                        },
                    },
                },
            })

            const form = await prisma.tbl_formulario.findMany({
                where: {
                    id_servico: it.FK_Servico_DiaristaServico.id,
                },
                include: {
                    FK_Perguntas_Formulario: {
                        select: {
                            pergunta: true,
                        },
                    },
                }
            })

            const statusService = await prisma.tbl_status_servico.findMany({
                where: {
                    id_servico: it.FK_Servico_DiaristaServico.id,
                },
                include: {
                    FK_Status_StatusServico: {
                        select: {
                            nome: true,
                        },
                    },
                },
                distinct: ["id_servico"],
            })

            serviceClient.push({
                data: {
                    serviceId: it.id,
                    status_service: statusService.map((it) => ({
                        status: it.FK_Status_StatusServico.nome,
                        data_hora: it.data_hora,
                    })),
                    name: it.FK_Servico_DiaristaServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.nome,
                    photo: it.FK_Servico_DiaristaServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.foto_perfil,
                    biography: it.FK_Servico_DiaristaServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.biografia,
                    type_clean: it.FK_Servico_DiaristaServico.FK_TipoLimpeza_Servico.nome,
                    date_hour: it.FK_Servico_DiaristaServico.data_hora,
                    obeservation: it.FK_Servico_DiaristaServico.observacao,
                    tasks: it.FK_Servico_DiaristaServico.tarefas_adicionais,
                    value: serviceValue?.valor,
                    question: form.map((it) => ({
                        asks: it.FK_Perguntas_Formulario.pergunta,
                        status: it.check,
                    })),
                    room: serviceRoom.map((it) => ({
                        name: it.FK_Comodo_ServicoComodo.nome,
                        quantity: it.quantidade,
                    }))
                },
            })
        }

        return serviceClient

    } catch (error) {

    }

    finally {
        await prisma.$disconnect()
    }
}

export {
    getServiceOpen
}