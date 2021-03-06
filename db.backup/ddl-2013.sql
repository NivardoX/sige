ALTER TABLE evento
   ADD COLUMN apresentado boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN evento.apresentado IS 'indica que o palestrante realmente veio e participou';

ALTER TABLE pessoa ADD COLUMN bio text;

ALTER TABLE public.evento DROP COLUMN curriculum;
ALTER TABLE public.evento ADD COLUMN tecnologias_envolvidas text;

-- upgrade versao 1.1.2
ALTER TABLE pessoa ADD COLUMN slideshare character varying(32);

CREATE TABLE tags
(
  id serial NOT NULL,
  descricao character varying(30) NOT NULL,
  CONSTRAINT tags_pk PRIMARY KEY (id)
);

CREATE TABLE evento_tags
(
  id_evento integer NOT NULL,
  id_tag integer NOT NULL,
  CONSTRAINT evento_tags_pkey PRIMARY KEY (id_evento, id_tag),
  CONSTRAINT evento_tags_id_evento_fkey FOREIGN KEY (id_evento)
      REFERENCES evento (id_evento) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT evento_tags_id_tag_fkey FOREIGN KEY (id_tag)
      REFERENCES tags (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- upgrade 1.2.0
ALTER TABLE evento_palestrante ADD COLUMN confirmado boolean;
ALTER TABLE evento_palestrante ALTER COLUMN confirmado SET NOT NULL;
ALTER TABLE evento_palestrante ALTER COLUMN confirmado SET DEFAULT false;

-- upgrade 1.2.1
ALTER TABLE encontro ADD COLUMN periodo_submissao_inicio date;
ALTER TABLE encontro ALTER COLUMN periodo_submissao_inicio SET NOT NULL;
ALTER TABLE encontro ADD COLUMN periodo_submissao_fim date;
ALTER TABLE encontro ALTER COLUMN periodo_submissao_fim SET NOT NULL;