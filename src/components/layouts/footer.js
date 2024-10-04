import BackToTop from "./back_to_top";

export default function Footer() {
    return (
        <>
            <footer className="h-[5vh] flex justify-center py-2">
                <p>Copyright 2022 - Todos os direitos reservados.</p>
            </footer>
            <BackToTop />
        </>
    );
}