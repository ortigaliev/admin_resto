const ViewModel = require("../schema/view.model");
const MemberModel = require("../schema/member.model");
const ProductModel = require("../schema/product.model");
const BoArticleModel = require("../schema/bo_article.model");

class View {
  constructor(mb_id) {
    this.viewModel = ViewModel;
    this.memberModel = MemberModel;
    this.productModel = ProductModel;
    this.boArticleModel = BoArticleModel;
    this.mb_id = mb_id;
  }

  async validateChosenTarget(view_ref_id, group_type) {
    try {
      let result;
      switch (group_type) {
        //member view logic
        case "member":
          result = await this.memberModel
            .findOne({ _id: view_ref_id, mb_status: "ACTIVE" })
            .exec();
          break;
        //Product view logic
        case "product":
          result = await this.productModel
            .findOne({ _id: view_ref_id, product_status: "PROCESS" })
            .exec();
          break;
        //Article view logic
        case "community":
          result = await this.boArticleModel
            .findOne({ _id: view_ref_id, art_status: "active" })
            .exec();
          break;
      }

      return !!result;
    } catch (err) {
      throw err;
    }
  }

  async inserMemberView(view_ref_id, group_type) {
    try {
      const new_view = new this.viewModel({
        mb_id: this.mb_id,
        view_ref_id: view_ref_id,
        view_group: group_type,
      });
      const result = await new_view.save();

      // increase target items view count by 1
      await this.modifyItemViewCounts(view_ref_id, group_type);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async modifyItemViewCounts(view_ref_id, group_type) {
    try {
      switch (group_type) {
        //increse member view by 1
        case "member":
          await this.memberModel
            .findByIdAndUpdate({ _id: view_ref_id }, { $inc: { mb_views: 1 } })
            .exec();
          break;
        //increse product view by 1
        case "product":
          await this.productModel
            .findByIdAndUpdate(
              { _id: view_ref_id },
              { $inc: { product_views: 1 } }
            )
            .exec();
          break;
        //increse article view by 1
        case "community":
          await this.boArticleModel
            .findByIdAndUpdate({ _id: view_ref_id }, { $inc: { art_views: 1 } })
            .exec();
          break;
      }

      return true;
    } catch (err) {
      throw err;
    }
  }

  async checkViewExistence(view_ref_id) {
    try {
      const view = await this.viewModel
        .findOne({
          mb_id: this.mb_id,
          view_ref_id: view_ref_id,
        })
        .exec();
      return view ? true : false;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = View;
