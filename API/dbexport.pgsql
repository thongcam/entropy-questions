--
-- PostgreSQL database dump
--

-- Dumped from database version 10.9
-- Dumped by pg_dump version 10.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cau_hoi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cau_hoi (
    question_id integer NOT NULL,
    cau_hoi text NOT NULL,
    cau_tra_loi text NOT NULL,
    phan_thi text NOT NULL
);


ALTER TABLE public.cau_hoi OWNER TO postgres;

--
-- Name: cau_hoi_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cau_hoi_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cau_hoi_question_id_seq OWNER TO postgres;

--
-- Name: cau_hoi_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cau_hoi_question_id_seq OWNED BY public.cau_hoi.question_id;


--
-- Name: cau_hoi question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hoi ALTER COLUMN question_id SET DEFAULT nextval('public.cau_hoi_question_id_seq'::regclass);


--
-- Data for Name: cau_hoi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cau_hoi (question_id, cau_hoi, cau_tra_loi, phan_thi) FROM stdin;
2	Viet Nam duoc thong nhat vao ngay nao?	30/4/1975	tang toc
1	Ai la nguoi kham pha ra chau My?	Christopher Colombus	tang toc
\.


--
-- Name: cau_hoi_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cau_hoi_question_id_seq', 34, true);


--
-- Name: cau_hoi cau_hoi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hoi
    ADD CONSTRAINT cau_hoi_pkey PRIMARY KEY (question_id);


--
-- PostgreSQL database dump complete
--

