class UserSerializer < ActiveModel::Serializer
  include ActionView::Helpers::NumberHelper

  attributes :first_name, :last_name, :email, :formatted_balance

  def formatted_balance
    number_to_currency(self.object.balance)
  end
end
