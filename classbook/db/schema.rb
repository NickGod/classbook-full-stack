# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151116051131) do

  create_table "discussions", force: :cascade do |t|
    t.integer  "lectureId",  limit: 4
    t.string   "begTime",    limit: 255
    t.string   "endTime",    limit: 255
    t.string   "days",       limit: 255
    t.string   "location",   limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "className",  limit: 255
  end

  create_table "discussions_users", id: false, force: :cascade do |t|
    t.integer "discussion_id", limit: 4
    t.integer "user_id",       limit: 4
  end

  add_index "discussions_users", ["discussion_id", "user_id"], name: "index_discussions_users_on_discussion_id_and_user_id", unique: true, using: :btree
  add_index "discussions_users", ["discussion_id"], name: "index_discussions_users_on_discussion_id", using: :btree
  add_index "discussions_users", ["user_id"], name: "index_discussions_users_on_user_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "groups", ["name"], name: "index_groups_on_name", unique: true, using: :btree

  create_table "lectures", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "begTime",    limit: 255
    t.string   "endTime",    limit: 255
    t.string   "days",       limit: 255
    t.string   "location",   limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "term",       limit: 255
    t.string   "department", limit: 255
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.string   "category",   limit: 255
    t.string   "context",    limit: 255
    t.boolean  "read",                   default: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
  end

  create_table "relationships", force: :cascade do |t|
    t.integer  "follower_id", limit: 4
    t.integer  "followed_id", limit: 4
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.boolean  "accepted",              default: false
  end

  add_index "relationships", ["followed_id"], name: "index_relationships_on_followed_id", using: :btree
  add_index "relationships", ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true, using: :btree
  add_index "relationships", ["follower_id"], name: "index_relationships_on_follower_id", using: :btree

  create_table "swap_requests", force: :cascade do |t|
    t.integer  "user_id",               limit: 4,   null: false
    t.integer  "has_dis",               limit: 4,   null: false
    t.integer  "want_dis",              limit: 4,   null: false
    t.integer  "current_match_user_id", limit: 4
    t.string   "black_list_user_id",    limit: 255
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  add_index "swap_requests", ["user_id", "has_dis", "want_dis"], name: "index_swap_requests_on_user_id_and_has_dis_and_want_dis", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "provider",               limit: 255,   default: "email", null: false
    t.string   "uid",                    limit: 255,   default: "",      null: false
    t.string   "encrypted_password",     limit: 255,   default: "",      null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,     default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
    t.string   "name",                   limit: 255
    t.string   "nickname",               limit: 255
    t.string   "image",                  limit: 255
    t.string   "email",                  limit: 255
    t.text     "tokens",                 limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "year",                   limit: 4
    t.string   "major",                  limit: 255
    t.string   "sex",                    limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

end
