export type IWord = IWordResult[] 

export interface IWordResult {
  meta: Meta
  hom?: number
  hwi: Hwi
  fl: string
  ins?: In[]
  def: Def[]
  dros?: Dro[]
  syns?: Syn[]
  et?: string[][]
  date?: string
  shortdef: string[]
} 

export interface Meta {
  id: string
  uuid: string
  sort: string
  src: string
  section: string
  stems: string[]
  offensive: boolean
}

export interface Hwi {
  hw: string
  prs?: Pr[]
}

export interface Pr {
  mw: string
  sound: Sound
}

export interface Sound {
  audio: string
  ref: string
  stat: string
}

export interface In {
  if: string
  il?: string
}

export interface Def {
  sseq: [string, Sseq][][]
  vd?: string
  sls?: string[]
}

export interface Sseq {
  sn?: string
  dt: [string, any][]
  sls?: string[]
}

export interface Dro {
  drp: string
  def: Def2[]
}

export interface Def2 {
  sseq: [string, Sseq2][][]
}

export interface Sseq2 {
  dt: [string, any][]
  sdsense?: Sdsense
  sn?: string
}

export interface Sdsense {
  sd: string
  dt: [string, any][]
}

export interface Syn {
  pl: string
  pt: [string, any][]
}
