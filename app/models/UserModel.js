var mongo = require('mongoose');
var crypto = new require('crypto');

Schema = mongo.Schema;

var PhoneSchema = new Schema({
    phone: {
        type: String,
        created_at: Date,
        updated_at: Date
    }
});

var JobSchema = new Schema({
    job: {
        type: String
    }
});

var LikeSchema = new Schema({
    like: {
        link: {
            type: String
        },
        created_at: {
            type: Date
        },
        type: {
            type: String
        }
    }
});

var AvatarSchema = new Schema({
    avatar: {
        type: String
    },
    active: {
        type: Boolean
    }
});

var AddressSchema = new Schema({
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    district: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});


UserSchema = Schema({
    username: {
        type: String,
        default: ''
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    provider: {
        type: String,
        default: ''
    },
    hashed_password: {
        type: String,
        default: ''
    },
    reset_password_token: {
        type: String
    },
    reset_password_sent_at: {
        type: Date
    },
    salt: {
        type: String,
        default: ''
    },
    authToken: {
        type: String,
        default: ''
    },
    facebook: {},
    twitter: {},
    github: {},
    google: {},
    linkedin: {},
    remember_created_at: {
        type: Date
    },
    sign_in_count: {},
    current_sign_in_at: {
        type: Date
    },
    last_sign_in_at: {
        type: Date
    },
    current_sign_in_ip: {
        type: Date
    },
    last_sign_in_ip: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    },
    birthday: {
        type: Date
    },
    sex: {
        type: String
    },
    phones: [PhoneSchema],
    jobs: [JobSchema],
    likes: [LikeSchema],
    dislike: {},
    active: {
        type: Boolean,
        default: false
    },
    avatars: [AvatarSchema],
    addresses: [AddressSchema],
    lang: {
        type: String
    },
    newseletter: {
        type: String
    }
});



UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */

    encryptPassword: function(password) {
        if (!password) return '';
        var encrypred;
        try {
            encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex');
            return encrypred
        } catch (err) {
            return ''
        }
    },

    /**
     * Validation is not required if using OAuth
     */

    doesNotRequireValidation: function() {
        return~ oAuthTypes.indexOf(this.provider);
    }
};

UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    });

User = mongo.model('user', UserSchema);
module.exports = User;
