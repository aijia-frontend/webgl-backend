const Service = require('egg').Service;

class BaseService extends Service {
  constructor(model, ctx) {
    super(ctx)
    this.name = model
  }
  //#region 新增
  /**
   * @description 新增单条数据
   * @param { model:Object } 数据模型对象
   */
  async create(model) {
    if( model == null ) throw new Error('[Service Error]:model can not be null')
    const { app } = this
    try{
      return await app.model[this.name].create(model)
    }catch(err){
      throw new Error(err)
    }
  }
  /**
   * @description 新增多条数据
   * @param { models:Array(Object) }  多条数据模型对象
   */
  async createMultiple(models) {
    if( models == null ) throw new Error('[Service Error]:model can not be null')
    if( models.length === 0 ) return null
    const { app } = this
    try{
      return await app.model[this.name].bulkCreate(models)
    }catch(err){
      throw new Error(err)
    }
  }
  //#endregion

  //#region 删除
  /**
   * @description 删除单条数据
   * @param { id:Number } 待删除多条数据的主键
   */
  async remove(id) {
    if( typeof id === 'number' && id > 0 ){
      const { app } = this
      return app.model[this.name].destroy({ where: { id }}) > 0
    }
    throw new Error('[Service Error]:id must be Number greater than 0')
  }

  /**
   * @description 删除多条数据
   * @param { ids:Number } 待删除多条数据的主键
   */
  async removeMultiple(ids) {
    if(Object.prototype.toString.call(ids) === '[object Array]' && ids.length > 0){
      const { app } = this
      const { Op } = app.Sequelize;
      return await app.model[this.name].destroy({ where: { id : { [Op.in]: ids } }})
    }
    throw new Error('[Service Error]:ids must be Array and length greater than 0')
  }

  /**
   * @description 删除单条数据(假删) 
   * @param { id:Number } 待删除数据的主键
   */
  async removeFake(id) {
    if( typeof id === 'number' && id > 0 ){
      const { app } = this
      return (await app.model[this.name].update({ state: 0 },{ where: { id: id } }))[0] > 0
    }
    throw new Error('[Service Error]:id must be Number greater than 0')
  }
  /**
   * @description 删除多条数据(假删)
  * @param { ids:Number } 待删除多条数据的主键
   */
  async removeMultipleFake(ids) {
    if(Object.prototype.toString.call(ids) === '[object Array]' && ids.length > 0){
      const { app } = this
      const { Op } = app.Sequelize
      return (await app.model[this.name].update({ state: 0 },{ where: { id: { [Op.in]: ids } } }))[0]
    }
  }
  //#endregion

  //#region 修改
  /**
   * @description 修改单条数据
   */
  async update(model) {
    if( model == null ) throw new Error('[Service Error]:model can not be null')
    if( !(Reflect.has(model,'id') && model.id > 0 ) ) throw new Error('[Service Error]:model must include id and greater than 0')
    const { app } = this
    return (await app.model[this.name].update(model,{ where: { id: model.id } }))[0] > 0
  }
  /**
   * @description 修改多条数据
   */
  async updateMultiple() {}
  //#endregion

  //#region 查询
  /**
   * @description 查询单条数据(查询出来返回的model,直接model.save()则可以完成数据更新)
   * @param 
   */
  async query(lamda) {
    const { app } = this
    return await app.model[this.name].findOne({where: Object.assign(lamda, { state: 1 })},{raw:false})
  }
  async queryById(id){
    const { app } = this
    return await app.model[this.name].findByPk(id)
  }
  /**
   * @description 查询多条数据
   */
  async queryMultiple() {}
  /**
   * @description 分页查询
   */
  async queryPagingList() {}
  /**
   * @description 查询总条数
   */
  async queryCount() {}
  /**
   * @description 判断是否存在
   */
  async exist() {}
  //#endregion
}
module.exports = BaseService