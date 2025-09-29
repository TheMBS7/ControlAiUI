'use client'

import { fetchCategorias } from '@/app/services/categoriaService';
import { createExtrato, deleteExtrato, editExtrato, fetchExtratos } from '@/app/services/extratoService';
import { fetchPessoas } from '@/app/services/pessoaService';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDownIcon, Pencil, Trash } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';


export default function ExtratosPage({
  params,
}: {
  params: Promise<{ mes: string }>
})  {
  const [extratos, setExtratos] = useState<Extrato[]>([]);
  const {mes} = use(params); // Pega o Id o Mês que o o usuario clicou na pag de extratos, pega como string. O id veio na URL
  const mesesName = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
  const [openCriacao, setOpenCriacao] = useState(false)
  const [openEdicao, setOpenEdicao] = useState(false)
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [totalSomado, setTotalSomado] = useState(0);
  const extratosFiltrados = extratos.filter((extrato: any) => extrato.mesId === parseInt(mes)); //verificar alternativas
  const [novoExtrato, setNovoExtrato] = useState<Extrato | undefined>(undefined);
  const [extratoSendoEditado, setExtratoSendoEditado] = useState<Extrato | undefined>(undefined);
  const [excluirTodasParcelas, setExcluirTodasParcelas] = useState(false);
  const [mostrarFormExclusao, setMostrarFormExclusao] = useState(false);

  useEffect(() => {
    carregarExtratos();
    buscarPessoas();
    buscarCategorias();
    
  },[mes])

  useEffect(() => {
    calculoTotal();
  },[extratosFiltrados])
  

  async function carregarExtratos() {
  try{
      const data = await fetchExtratos();
      setExtratos(data)
      calculoTotal();
  }catch(erro){
      console.error("Erro ao carregar extrato do Mês", erro)
  }
}

  async function buscarCategorias() {
    try{
      const categoriaList = await fetchCategorias();
      setCategorias(categoriaList)
    }catch(erro){
      console.error('Erro ao buscar categorias', erro)
    }
  }

  async function buscarPessoas() {
    try{
      const pessoaList = await fetchPessoas();
      setPessoas(pessoaList)
    }catch(erro){
      console.error('Erro ao buscar pessoas', erro)
    }
  }

 async function calculoTotal() {
  try {
    let totalMes = 0
    extratosFiltrados.forEach((extrato) => {
      totalMes += Number(extrato.valorTotal)
    })
    setTotalSomado(totalMes)
  } catch (erro) {
    console.error("erro para calcular o total do mês", erro)
  }
}
 
  async function handleCriar() {
    if(!novoExtrato) return;

    if(!novoExtrato.descricao.trim()) return;

    novoExtrato.mesId = Number(mes);
    novoExtrato.numeroParcela = 1;

    try{
      
      await createExtrato(novoExtrato);
      setNovoExtrato(undefined);
      await carregarExtratos();

    }catch(erro){
      console.log(novoExtrato)
      alert(erro)
    }
  }

  async function handleEditar(extrato: Extrato) {

    try{
      await editExtrato(extrato)
      await carregarExtratos()
    }catch(erro){
      alert("Erro ao editar lançamento.")
    }
    
  }
  async function handleDelete(id: number, ExcluirTodasParcelas: boolean) {
    
    try{
    await deleteExtrato(id,ExcluirTodasParcelas)
    await carregarExtratos()
    }catch(erro){
      alert("Erro ao deletar lançamento.")
    }
  }

  return (
    <div>
      <Card className='w-[50%] mx-auto'>
        <CardHeader>
          <CardTitle className='font-bold text-4xl flex justify-center'>
            Extrato do mês de {mesesName[Number(mes) - 1]}
          </CardTitle>
          <CardAction>A pensar</CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className='font-bold'>
                <TableHead ></TableHead>
                <TableHead className='font-bold'>DATA</TableHead>
                <TableHead className='font-bold'>DESCRIÇÃO</TableHead>
                <TableHead className='font-bold'>CATEGORIA</TableHead>
                <TableHead className='font-bold'>PESSOA</TableHead>
                <TableHead className='font-bold'>PARCELAS</TableHead>
                <TableHead className='text-right font-bold'>VALOR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {extratosFiltrados.map((extrato) => {
                const categoriaMapeada = categorias.find(categoria => categoria.id === extrato.categoriaId);
                const pessoaMapeada = pessoas.find(pessoa => pessoa.id === extrato.pessoaId);
                return(
                <TableRow key={extrato.id}>
                  <TableCell>
                    <Button
                    variant="ghost"
                    
                    onClick={() => setExtratoSendoEditado(extrato)}
                    >
                      <Pencil className='text-blue-500'/>
                    </Button>
                    {extratoSendoEditado?.id === extrato.id &&
                    <> 
                      <div className="fixed inset-0 bg-background opacity-60 z-40"></div>
                      <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 w-[90%] max-w-5xl shadow-lg">
                        <CardHeader>
                          <CardTitle className='text-2xl'>Edição de Lançamento</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table >
                            <TableHeader>
                              <TableRow className='hover:bg-transparent'>
                                <TableHead className='font-bold'>DESCRIÇÃO</TableHead>
                                <TableHead className='font-bold'>PESSOA</TableHead>
                                <TableHead className='font-bold'>CATEGORIA</TableHead>
                                <TableHead className='font-bold'>PARCELA</TableHead>
                                <TableHead className='font-bold'>DATA</TableHead>
                                <TableHead className='font-bold'>VALOR</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className='hover:bg-transparent'>
                                <TableCell>
                                  <Input
                                  placeholder='Descrição:'
                                  value={extratoSendoEditado?.descricao ?? ""}
                                  className='w-45'
                                  onChange={(e => setExtratoSendoEditado((prev)=> ({
                                    ...prev!,
                                    descricao: e.target.value
                                  })))}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Select 
                                    value={String(extratoSendoEditado?.pessoaId ?? "")} 
                                    onValueChange={(value) => {
                                      setExtratoSendoEditado((prev) => ({
                                        ...prev!,
                                        pessoaId: Number(value), // mantém o ID no estado
                                      }));
                                    }}
                                  >
                                    <SelectTrigger className="">
                                      <SelectValue placeholder="Pessoa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel className="text-center">Pessoas</SelectLabel>
                                        {pessoas.map((pessoa) => (
                                          <SelectItem value={String(pessoa.id)} key={pessoa.id}>
                                            {pessoa.nome} 
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <Select 
                                    value={String(extratoSendoEditado?.categoriaId ?? "")} 
                                    onValueChange={(value) => {
                                      setExtratoSendoEditado((prev) => ({
                                        ...prev!,
                                        categoriaId: Number(value), // mantém o ID no estado
                                      }));
                                    }}
                                  >
                                    <SelectTrigger className="">
                                      <SelectValue placeholder="Categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel className="text-center">Categorias</SelectLabel>
                                        {categorias.map((categoria) => (
                                          <SelectItem value={String(categoria.id)} key={categoria.id}>
                                            {categoria.nome}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <Input
                                  className='w-15'
                                  placeholder='Parcelas'
                                  value={extratoSendoEditado.numeroParcela + "/" + extratoSendoEditado.numeroMaxParcelas}
                                  readOnly
                                  />
                                </TableCell>
                                <TableCell>
                                  <Popover open={openEdicao} onOpenChange={setOpenEdicao}>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant="outline"
                                        id="date"
                                        className="w-40 justify-between font-normal border border-input rounded-md bg-card text-sm shadow-sm"
                                        >
                                        {extratoSendoEditado?.data ? new Date(extratoSendoEditado.data).toLocaleDateString() : "Selecione a Data"}
                                        <ChevronDownIcon/>    
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0 " align="start">
                                        <Calendar
                                        mode="single"
                                        selected={extratoSendoEditado?.data}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                            setExtratoSendoEditado((prev) => ({
                                                ...prev!,
                                                data: new Date(date!)
                                            }))
                                            setOpenEdicao(false)
                                        }}
                                        />
                                    </PopoverContent>
                                  </Popover>
                                </TableCell>
                                <TableCell>
                                  <NumericFormat
                                  className="w-30"
                                  value={extratoSendoEditado?.valorTotal}
                                  thousandSeparator="."
                                  decimalSeparator=","
                                  prefix="R$ "
                                  decimalScale={2}
                                  allowNegative={false}
                                  customInput={Input}
                                  onValueChange={(values) => {
                                      setExtratoSendoEditado((prev) => ({
                                      ...prev!,
                                      valorTotal: values.floatValue ?? 0 // Atualiza o valor ou coloca zero
                                      }));
                                  }}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                        <CardFooter className='gap-2'>
                          <Button
                          variant="ghost"
                          className='bg-[#12698A] font-bold'
                          onClick={() => {
                            handleEditar(extratoSendoEditado)
                            setExtratoSendoEditado(undefined);
                          }} //--------------------------------------------------------
                          >
                           Salvar
                          </Button>
                          <Button
                          variant="ghost"
                          className='bg-[#12698A] font-bold text-white'
                          onClick={() => setExtratoSendoEditado(undefined)}
                          >
                            Cancelar
                          </Button>
                          <Button
                          variant="ghost"
                          onClick={() => setMostrarFormExclusao(true)}
                          >
                            <Trash className="text-red-500 "/>
                          </Button>
                        </CardFooter>
                      </Card>
                    </>
                    }
                    {mostrarFormExclusao && (
                      <>
                        <div className="fixed inset-0 bg-background opacity-50 z-50"></div>
                        <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 p-4 w-[90%] max-w-xl shadow-lg">
                          <CardHeader>
                            <CardTitle className='text-2xl'>Tem certeza que deseja excluir?</CardTitle>
                          </CardHeader>
                          <CardContent className="flex items-start gap-2">
                            <input
                            type='checkbox'
                            checked={excluirTodasParcelas}
                            className='mt-1' 
                            onChange={(e) => setExcluirTodasParcelas(e.target.checked)}
                            />
                            <p className="whitespace-normal">Ao escolher essa opção, todas as parcelas associadas a esse lançamento serão excluídas, incluindo as de extratos anteriores.</p>
                          </CardContent>
                          <CardFooter className='gap-2'>
                            <Button
                            variant="ghost"
                            className='bg-[#12698A] font-bold'
                            onClick={() => {
                              handleDelete(extratoSendoEditado?.id!, excluirTodasParcelas)
                              setMostrarFormExclusao(false)
                              setExcluirTodasParcelas(false)
                              setExtratoSendoEditado(undefined)
                            }}
                            >
                              Sim!
                            </Button>
                            <Button
                            variant="ghost"
                            className='bg-[#12698A] font-bold'
                            onClick={() => {
                              setMostrarFormExclusao(false)
                              setExcluirTodasParcelas(false)
                            }}
                            >
                              Cancelar
                            </Button>
                          </CardFooter>
                        </Card>
                      </>
                    )}
                  </TableCell>
                  <TableCell>{new Date(extrato.data).toLocaleDateString()}</TableCell>
                  <TableCell>{extrato.descricao}</TableCell>
                  <TableCell>{categoriaMapeada?.nome}</TableCell>
                  <TableCell>{pessoaMapeada?.nome}</TableCell>
                  <TableCell>{extrato.numeroParcela + "/" + extrato.numeroMaxParcelas}</TableCell>
                  <TableCell className='text-right'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(extrato.valorTotal)}</TableCell>
                </TableRow>
              )})}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={5} className='font-bold'>TOTAL</TableCell>
                <TableCell className='text-right font-bold'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSomado)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
        <CardFooter className="flex gap-1">
          <Input
          placeholder='Descrição:'
          value={novoExtrato?.descricao ?? ""}
          className='w-90'
          onChange={(e => setNovoExtrato((prev)=> ({
            ...prev!,
            descricao: e.target.value
          })))}
          />
          <Select 
            value={String(novoExtrato?.pessoaId ?? "")} 
            onValueChange={(value) => {
              setNovoExtrato((prev) => ({
                ...prev!,
                pessoaId: Number(value), // mantém o ID no estado
              }));
            }}
          >
            <SelectTrigger className="w-[25%]">
              <SelectValue placeholder="Pessoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-center">Pessoas</SelectLabel>
                {pessoas.map((pessoa) => (
                  <SelectItem value={String(pessoa.id)} key={pessoa.id}>
                    {pessoa.nome} 
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select 
            value={String(novoExtrato?.categoriaId ?? "")} 
            onValueChange={(value) => {
              setNovoExtrato((prev) => ({
                ...prev!,
                categoriaId: Number(value), // mantém o ID no estado
              }));
            }}
          >
            <SelectTrigger className="w-[25%]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-center">Categorias</SelectLabel>
                {categorias.map((categoria) => (
                  <SelectItem value={String(categoria.id)} key={categoria.id}>
                    {categoria.nome}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
          type='number'
          value={novoExtrato?.numeroMaxParcelas ?? ""}
          min={1}
          className='w-40'
          placeholder='Parcela'
          onChange={e => setNovoExtrato((prev) => ({
            ...prev!,
            numeroMaxParcelas: Number(e.target.value)
          }))}
          />

          <Popover open={openCriacao} onOpenChange={setOpenCriacao}>
            <PopoverTrigger asChild>
                <Button
                variant="ghost"
                id="date"
                className="w-40 justify-between font-normal"
                >
                {novoExtrato?.data ? novoExtrato.data.toLocaleDateString() : "Selecione a Data"}
                <ChevronDownIcon/>    
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                mode="single"
                selected={novoExtrato?.data}
                captionLayout="dropdown"
                onSelect={(date) => {
                    setNovoExtrato((prev) => ({
                        ...prev!,
                        data: new Date(date!)
                    }))
                    setOpenCriacao(false)
                }}
                />
            </PopoverContent>
          </Popover>
          <NumericFormat
          className="w-50"
          value={novoExtrato?.valorTotal ?? 0}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          allowNegative={false}
          customInput={Input}
          onValueChange={(values) => {
              setNovoExtrato((prev) => ({
              ...prev!,
              valorTotal: values.floatValue ?? 0 // Atualiza o valor ou coloca zero
              }));
          }}
          />
          <Button
          variant='ghost'
          className='bg-[#12698A] font-bold'
          onClick={() => {
            handleCriar()
          }}
          >
            Enviar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}