using APIAngular.Model;

namespace APIAngular.Repositorios.Interface
{
    public interface ITankRepositorio
    {
        Task<List<TankModel>> BuscarTodosId();

        Task<TankModel> BuscarPorIdUnico(int id);

        Task<TankModel> Adicionar(TankModel tank);

        Task<TankModel> Atualizar(TankModel tank, int id);

        Task<bool> Apagar(int id);
    }
}
