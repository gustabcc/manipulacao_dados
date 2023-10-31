export default async function fetchData<T>(url: string): Promise<T | null> {
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error("Erro: " + response.status)
        const json = await response.json();
        return json;
    } catch (erro) {
        if(erro instanceof Error) {
            console.log("fetchData: " + erro)
        }
        return null;
    }
}